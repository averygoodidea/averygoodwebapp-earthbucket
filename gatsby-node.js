/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')
const { slash } = require('gatsby-core-utils')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')
exports.onCreateNode = ({ node }) => {
  fmImagesToRelative(node)
}
exports.createPages = async ({ graphql, actions, reporter }) => {
	const { createPage } = actions
	const result = await graphql(
		`
			{
			  allAlbumPosts(sort: {order: ASC, fields: createdAt}, filter: {id: {ne: "dummy"}}) {
			    edges {
			      node {
			      	alternative_id
			      	categories
			      	createdAt
			        id
			        images
			        moreInfoUrl
			        summary
			        slugId
			        title
			      }
			    }
			  }
			  allAlbumPostImages: allS3Object(filter: {Key: {regex: "/album/posts/images/" }}) {
			    edges {
			      node {
			        id
			        Key
			        image: localFile {
			          publicURL
			          childImageSharp {
			            fluid {
			              base64
			              src
			              tracedSVG
			            }
			          }
			        }
			      }
			    }
			  }
			  allBlogPosts: allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}, filter: {frontmatter: {published: {eq: true}}}) {
			    edges {
			      node {
			        id
			        excerpt
			        html
			        frontmatter {
			          title
			          date
			          slug
			          author
			          coverPhoto
			          published
			          tags
			        }
			        timeToRead
			      }
			    }
			  }
			  allBlogPostImages: allS3Object(filter: {Key: {regex: "/blog/posts/images/" }}) {
			    edges {
			      node {
			        id
			        Key
			        image: localFile {
			          publicURL
			          childImageSharp {
			            fluid {
			              base64
			              src
			              tracedSVG
			            }
			          }
			        }
			      }
			    }
			  }
			}

		`)
	if (result.errors) {
		reporter.panicOnBuild("Error while running GraphQL query.")
		return
	}
	/* Album Posts */
	// create album item s3 key map
	const albumPostTemplate = path.resolve('src/templates/album-post/album-post.jsx')
	const authorAlbumPostTemplate = path.resolve('src/templates/author-album-post/author-album-post.jsx')
	const { allAlbumPosts, allAlbumPostImages } = result.data
	const s3AlbumPostImagesMap = {}
	allAlbumPostImages.edges.forEach( ({ node }) => {
      s3AlbumPostImagesMap[node.Key] = node.image
    })
	const albumCategoryNames = {}
	// create album item posts
	allAlbumPosts.edges.forEach( edge => {
		const { categories, id, images, slugId } = edge.node
		// construct public album item post
		const s3ObjectList = images.map( key => s3AlbumPostImagesMap[key] )
		createPage({
			path: `/a/${slugId}/`,
			component: slash(albumPostTemplate),
			context: {
				id,
				s3ObjectList
			}
		})
		// construct author album item page
		createPage({
			path: `/author/album/${slugId}/`,
			component: slash(authorAlbumPostTemplate),
			context: {
				id,
				allAlbumPosts: allAlbumPosts.edges,
				s3ObjectList
			}
		})
		// collect category names
		categories.forEach( category => albumCategoryNames[category] = true )
	})
	// create category pages
	const albumCategoryTemplate = path.resolve('src/templates/album-category/album-category.jsx')
	const allAlbumCategories = Object.keys(albumCategoryNames)
	allAlbumCategories.forEach( category => {
		const albumPosts = allAlbumPosts.edges.filter( ({ node }) => node.categories.includes(category))
		createPage({
			path: `/a/category/${category}/`,
			component: slash(albumCategoryTemplate),
			context: {
				albumPosts,
				s3ObjectMap: s3AlbumPostImagesMap,
				taxonomies: allAlbumCategories
			}
		})
	})
	/* Blog Posts */
	// create blog posts
	const blogPostTemplate = path.resolve('src/templates/blog-post/blog-post.jsx')
	const { allBlogPosts, allBlogPostImages } = result.data
	// create blog post image s3 key map
	const s3BlogPostImagesMap = {}
	allBlogPostImages.edges.forEach( ({ node }) => {
      s3BlogPostImagesMap[node.Key] = node.image
    })
    const blogTagNames = {}
	allBlogPosts.edges.forEach( ({ node }, i) => {
		const { excerpt, frontmatter, html, id, timeToRead } = node
		// construct blog post
		const next = i === allBlogPosts.edges.length - 1 ? null : allBlogPosts.edges[i + 1].node.frontmatter
		const previous = i === 0 ? null : allBlogPosts.edges[i - 1].node.frontmatter
		createPage({
			path: `/b/${frontmatter.slug}/`,
			component: slash(blogPostTemplate),
			context: {
				excerpt,
				html,
				id,
				next,
				previous,
				s3ObjectMap: s3BlogPostImagesMap,
				timeToRead,
				...frontmatter
			}
		})
		// collect tag names
		frontmatter.tags.forEach( tag => blogTagNames[tag] = true )
	})
	// create tag pages
	const blogTagTemplate = path.resolve('src/templates/blog-tag/blog-tag.jsx')
	const allBlogTags = Object.keys(blogTagNames)
	allBlogTags.forEach( tag => {
		const allPostExcerpts = allBlogPosts.edges.filter( ({ node }) => node.frontmatter.tags.includes(tag))
		createPage({
			path: `/b/tag/${tag}/`,
			component: slash(blogTagTemplate),
			context: {
				allPostExcerpts,
				s3ObjectMap: s3BlogPostImagesMap,
				taxonomies: allBlogTags
			}
		})
	})
}