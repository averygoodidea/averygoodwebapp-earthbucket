require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
})
module.exports = {
  siteMetadata: {
    title: `A Very Good Web App`,
    description: `A web app starter kit that utilizes infrastructure as a service`,
    author: `@averygoodidea`,
  },
  plugins: [
    // Web App Manifest
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `AVeryGoodWebApp`,
        short_name: `AVeryGoodWebApp`,
        start_url: `/`,
        background_color: `#e6ccbe`,
        theme_color: `#e6ccbe`,
        display: `browser`,
        icon: `src/assets/img/favicon.png`, // This path is relative to the root of the site.
        crossOrigin: `use-credentials`,
        cache_busting_mode: 'none'
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    {
       resolve: 'gatsby-plugin-offline',
       options: {
          workboxConfig: {
             globPatterns: ['**/*']
          }
       }
    },
    //'gatsby-plugin-remove-serviceworker',
    /* Plugin for Web App Metadata */
    `gatsby-plugin-react-helmet`,
    /* Import Image Files from Data Sources */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/img`,
      },
    },
    {
      resolve: `@robinmetral/gatsby-source-s3`,
      options: {
        aws: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: process.env.AWS_REGION
        },
        buckets: [process.env.AWS_EARTHBUCKET_MEDIA_BUCKET]
      }
    },
    /* Plugins for Image Manipulation */
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    /* CSS Pre-Processor */
    {
      resolve: `gatsby-plugin-sass`,
        options: {
          // https://github.com/gatsbyjs/gatsby/issues/6655
          data: '@import "main.scss";',
          includePaths: ["src/assets/sass"]
        },
     },
    /* Import Content from Data Sources */
    {
      resolve: "gatsby-source-apiserver",
      options: {
        // Type prefix of entities from server
        typePrefix: "",
        // The url, this should be the endpoint you are attempting to pull data from
        url: `https://${process.env.GATSBY_EARTHBUCKET_HOSTNAME}/api/1/album/posts/graphql`,
        method: "get",
        headers: {
          "Content-Type": "application/json"
        },
        // Request body
        data: '',
        // Name of the data to be downloaded.  Will show in graphQL or be saved to a file
        // using this name. i.e. posts.json
        name: `albumPosts`,
        // Nested level of entities in response object, example: `data.posts`
        entityLevel: ``,
        // Optionally save the JSON data to a file locally
        // Default is false
        localSave: true,
        //  Required folder path where the data should be saved if using localSave option
        //  This folder must already exist
        path: `${__dirname}/src/data/auth/`,
        // Optionally include some output when building
        // Default is false
        verboseOutput: true, // For debugging purposes
        // Optionally skip creating nodes in graphQL.  Use this if you only want
        // The data to be saved locally
        // Default is false
        skipCreateNode: false, // skip import to graphQL, only use if localSave is all you want
        // Optionally re-source data when it changes and
        // `gatsby develop` is running.
        // Requires `ENABLE_GATSBY_REFRESH_ENDPOINT=true`.
        // See https://www.gatsbyjs.org/docs/environment-variables/#reserved-environment-variables
        // Default is false
        enableDevRefresh: true,
        // Optionally override key used to re-source data
        // when `gatsby develop` is running.
        // Requires `enableDevRefresh: true`.
        // See setting directly above this one.
        // See also https://github.com/gatsbyjs/gatsby/issues/14653
        // Default is `id`
        refreshId: `id`,
        // Pass an array containing any number of the entity configuration properties (except verbose, auth0Config),
        // any not specified are defaulted to the general properties that are specified
        // Only available from version 2.1.0
        entitiesArray: [
          {
            url: `https://${process.env.GATSBY_EARTHBUCKET_HOSTNAME}/api/1/album/posts`,
            method: "get",
            headers: {
              "Content-Type": "application/json"
            },
            name: `albumPosts`
          }
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
          excerpt_separator: '<!-- endexcerpt -->',
          plugins: [
              // gatsby-remark-relative-images must
              // go before gatsby-remark-images
              {
                resolve: `gatsby-remark-relative-images`,
              },
              {
                resolve: `gatsby-remark-images`,
                options: {
                  // It's important to specify the maxWidth (in pixels) of
                  // the content container as this plugin uses this as the
                  // base for generating different widths of each image.
                  maxWidth: 590,
                },
              },
          ],
      },
    },
    {
      resolve: `gatsby-plugin-valine`,
      options: {
          avatarForce: true,
          appId: process.env.VALINE_LEANCLOUD_APP_ID,
          appKey: process.env.VALINE_LEANCLOUD_APP_KEY,
          avatar: `hide`,
          lang: 'en',
          langMode: {
            "nick": "nickname",
            "mail": "email",
            "nickFail": "Nick name cannot be less than 3 characters.",
            "link": "Website"
          },
          enableQQ: true,
          placeholder: `Leave a comment.`,
          requiredFields: ['nick', 'mail']
      }
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false
        }
      }
    },
    `gatsby-plugin-anchor-links`
  ],
}