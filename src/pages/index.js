import React, { Component } from "react"
import { graphql } from 'gatsby'
import { SEO } from 'atoms'
import { CardCollection, Layout } from 'organisms'

class IndexPage extends Component {
  constructor () {
    super()
    this.state = {
      inventoryItems: [],
      s3Map: {}
    }
  }
  componentDidMount() {
    const { allAlbumPosts, allAlbumPostImages } = this.props.data
    const s3ObjectMap = {}
    allAlbumPostImages.edges.forEach( ({ node }) => {
      s3ObjectMap[node.Key] = node.image
    })
    // create inventory category taxonomies
    const inventoryCategoryNames = {}
    allAlbumPosts.edges.forEach( ({ node }) => node.categories.forEach( category => inventoryCategoryNames[category] = true ))
    const taxonomies = Object.keys(inventoryCategoryNames)
    
    this.setState({
      inventoryItems: allAlbumPosts.edges,
      s3ObjectMap,
      taxonomies
    })
  }
  render() {
    const { inventoryItems, s3ObjectMap, taxonomies } = this.state
    const { location } = this.props
    return (
      <Layout location={location}>
        <SEO title="Home" keywords={['jesus', 'black', 'negroland', 'survivalist', 'hebrew', 'christ']} />
        <CardCollection
          inventoryItems={inventoryItems}
          location={location}
          s3={s3ObjectMap}
          taxonomies={taxonomies}
        />
      </Layout>
    )
  }
}
export default IndexPage
export const pageQuery = graphql`
  fragment S3Image on S3Object {
    image: localFile {
      publicURL
      childImageSharp {
        fluid(maxWidth: 874) {
          base64
          src
          tracedSVG
        }
      }
      }
  }
  query {
    allAlbumPosts(sort: {order: DESC, fields: createdAt}, filter: {id: {ne: "dummy"}}) {
      edges {
        node {
          id
          slugId
          images
          title
          categories
          price
        }
      }
    }
    allAlbumPostImages: allS3Object(filter: {Key: {regex: "/album/posts/images/" }}) {
      edges {
        node {
          Key
          ...S3Image
        }
      }
    }
  }
`