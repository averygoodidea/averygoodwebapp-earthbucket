import { graphql, useStaticQuery } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import Helmet from "react-helmet";

function SEO({ description, keywords, lang, meta, openGraphImgSrc, title }) {
  const { defaultOpenGraphImg, site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
        defaultOpenGraphImg: imageSharp(
          fluid: { originalName: { eq: "open-graph.jpg" } }
        ) {
          id
          fluid {
            src
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const metaOpenGraphImgSrc = openGraphImgSrc || defaultOpenGraphImg.fluid.src;

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription
        },
        {
          property: `og:title`,
          content: title
        },
        {
          property: `og:description`,
          content: metaDescription
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          name: `twitter:card`,
          content: `summary`
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author
        },
        {
          name: `twitter:title`,
          content: title
        },
        {
          name: `twitter:description`,
          content: metaDescription
        },
        {
          name: "og:image",
          content: metaOpenGraphImgSrc
        }
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `)
              }
            : []
        )
        .concat(meta)}
    />
  );
}

SEO.defaultProps = {
  keywords: [],
  lang: `en`,
  meta: [],
  description: ``
};

SEO.propTypes = {
  description: PropTypes.string,
  keywords: PropTypes.array,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired
};

export default SEO;
