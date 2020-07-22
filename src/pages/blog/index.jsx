import { SEO } from "atoms";
import { graphql } from "gatsby";
import { ExcerptCollection, Layout } from "organisms";
import React from "react";

const BlogIndexPage = ({ data, location }) => {
  const postExcerpts = data.allPostExcerpts.edges;
  // create post taxonomies
  const blogTagNames = {};
  postExcerpts.forEach(({ node }) =>
    node.frontmatter.tags.forEach(tag => (blogTagNames[tag] = true))
  );
  const taxonomies = Object.keys(blogTagNames);
  // create s3 image map
  const s3 = {};
  data.allPostImages.edges.forEach(({ node }) => {
    s3[node.Key] = node.image;
  });
  return (
    <Layout location={location} sectionTitle="Blog">
      <SEO title="Blog" />
      <ExcerptCollection
        location={location}
        postExcerpts={postExcerpts}
        s3={s3}
        taxonomies={taxonomies}
      />
    </Layout>
  );
};
export default BlogIndexPage;
export const query = graphql`
  query {
    allPostExcerpts: allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      edges {
        node {
          frontmatter {
            author
            coverPhoto
            date
            slug
            tags
            title
          }
          excerpt
        }
      }
    }
    allPostImages: allS3Object(filter: { Key: { regex: "^posts/images/" } }) {
      edges {
        node {
          Key
          ...S3Image
        }
      }
    }
  }
`;
