// /**
//  * Implement Gatsby's Node APIs in this file.
//  *
//  * See: https://www.gatsbyjs.org/docs/node-apis/
//  */
// const path = require('path')
// const { slash } = require('gatsby-core-utils')
// const { fmImagesToRelative } = require('gatsby-remark-relative-images')
// exports.onCreateNode = ({ node }) => {
//   fmImagesToRelative(node)
// }
// exports.createPages = async ({ graphql, actions, reporter }) => {
// 	const { createPage } = actions
// 	const result = await graphql(
// 		`
// 			{
// 			  allInventoryItems(sort: {order: DESC, fields: createdAt}, filter: {id: {ne: "dummy"}}) {
// 			    edges {
// 			      node {
// 			      	alternative_id
// 			      	categories
// 			      	createdAt
// 			        id
// 			        images
// 			        moreInfoUrl
// 			        price
// 			        summary
// 			        scriptureAddress
// 			        slugId
// 			        title
// 			      }
// 			    }
// 			  }
// 			  allInventoryItemImages: allS3Object(filter: {Key: {regex: "^inventory/items/" }}) {
// 			    edges {
// 			      node {
// 			        id
// 			        Key
// 			        image: localFile {
// 			          publicURL
// 			          childImageSharp {
// 			            fluid {
// 			              base64
// 			              src
// 			              tracedSVG
// 			            }
// 			          }
// 			        }
// 			      }
// 			    }
// 			  }
// 			  allBlogPosts: allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}, filter: {frontmatter: {published: {eq: true}}}) {
// 			    edges {
// 			      node {
// 			        id
// 			        excerpt
// 			        html
// 			        frontmatter {
// 			          title
// 			          date
// 			          slug
// 			          author
// 			          coverPhoto
// 			          published
// 			          tags
// 			        }
// 			        timeToRead
// 			      }
// 			    }
// 			  }
// 			  allBlogPostImages: allS3Object(filter: {Key: {regex: "^post/images/" }}) {
// 			    edges {
// 			      node {
// 			        id
// 			        Key
// 			        image: localFile {
// 			          publicURL
// 			          childImageSharp {
// 			            fluid {
// 			              base64
// 			              src
// 			              tracedSVG
// 			            }
// 			          }
// 			        }
// 			      }
// 			    }
// 			  }
// 			}

// 		`)
// 	if (result.errors) {
// 		reporter.panicOnBuild("Error while running GraphQL query.")
// 		return
// 	}
// 	// create inventory item s3 key map
// 	const inventoryItemTemplate = path.resolve('src/templates/inventory-item/inventory-item.js')
// 	const authorInventoryItemTemplate = path.resolve('src/templates/author-inventory-item/author-inventory-item.js')
// 	const { allInventoryItems, allInventoryItemImages } = result.data
// 	const s3InventoryItemImagesMap = {}
// 	allInventoryItemImages.edges.forEach( ({ node }) => {
//       s3InventoryItemImagesMap[node.Key] = node.image
//     })
// 	const inventoryCategoryNames = {}
// 	// create inventory item posts
// 	allInventoryItems.edges.forEach( edge => {
// 		const { categories, id, images, slugId, title } = edge.node
// 		// construct public inventory item post
// 		const s3ObjectList = images.map( key => s3InventoryItemImagesMap[key] )
// 		createPage({
// 			path: `/i/${slugId}/`,
// 			component: slash(inventoryItemTemplate),
// 			context: {
// 				id,
// 				s3ObjectList
// 			}
// 		})
// 		// construct author inventory item page
// 		createPage({
// 			path: `/author/items/${slugId}/`,
// 			component: slash(authorInventoryItemTemplate),
// 			context: {
// 				id,
// 				allInventoryItems: allInventoryItems.edges,
// 				s3ObjectList
// 			}
// 		})
// 		// collect category names
// 		categories.forEach( category => inventoryCategoryNames[category] = true )
// 	})
// 	// create category pages
// 	const inventoryCategoryTemplate = path.resolve('src/templates/inventory-category/inventory-category.jsx')
// 	const allInventoryCategories = Object.keys(inventoryCategoryNames)
// 	allInventoryCategories.forEach( category => {
// 		const inventoryItems = allInventoryItems.edges.filter( ({ node }) => node.categories.includes(category))
// 		createPage({
// 			path: `/i/category/${category}/`,
// 			component: slash(inventoryCategoryTemplate),
// 			context: {
// 				inventoryItems,
// 				s3ObjectMap: s3InventoryItemImagesMap,
// 				taxonomies: allInventoryCategories
// 			}
// 		})
// 	})
// 	// create blog posts
// 	const blogPostTemplate = path.resolve('src/templates/blog-post/blog-post.jsx')
// 	const { allBlogPosts, allBlogPostImages } = result.data
// 	// create blog post image s3 key map
// 	const s3BlogPostImagesMap = {}
// 	allBlogPostImages.edges.forEach( ({ node }) => {
//       s3BlogPostImagesMap[node.Key] = node.image
//     })
//     const blogTagNames = {}
// 	allBlogPosts.edges.forEach( ({ node }, i) => {
// 		const { excerpt, frontmatter, html, id, timeToRead } = node
// 		// construct blog post
// 		const next = i === allBlogPosts.edges.length - 1 ? null : allBlogPosts.edges[i + 1].node.frontmatter
// 		const previous = i === 0 ? null : allBlogPosts.edges[i - 1].node.frontmatter
// 		createPage({
// 			path: `/blog/${frontmatter.slug}/`,
// 			component: slash(blogPostTemplate),
// 			context: {
// 				excerpt,
// 				html,
// 				id,
// 				next,
// 				previous,
// 				s3ObjectMap: s3BlogPostImagesMap,
// 				timeToRead,
// 				...frontmatter
// 			}
// 		})
// 		// collect tag names
// 		frontmatter.tags.forEach( tag => blogTagNames[tag] = true )
// 	})
// 	// create category pages
// 	const blogTagTemplate = path.resolve('src/templates/blog-tag/blog-tag.jsx')
// 	const allBlogTags = Object.keys(blogTagNames)
// 	allBlogTags.forEach( tag => {
// 		const allPostExcerpts = allBlogPosts.edges.filter( ({ node }) => node.frontmatter.tags.includes(tag))
// 		createPage({
// 			path: `/blog/tag/${tag}/`,
// 			component: slash(blogTagTemplate),
// 			context: {
// 				allPostExcerpts,
// 				s3ObjectMap: s3BlogPostImagesMap,
// 				taxonomies: allBlogTags
// 			}
// 		})
// 	})
// }