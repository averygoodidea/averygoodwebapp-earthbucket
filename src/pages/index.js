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
    const { allInventoryItems, allInventoryItemImages } = this.props.data
    const s3ObjectMap = {}
    allInventoryItemImages.edges.forEach( ({ node }) => {
      s3ObjectMap[node.Key] = node.image
    })
    // create inventory category taxonomies
    const inventoryCategoryNames = {}
    allInventoryItems.edges.forEach( ({ node }) => node.categories.forEach( category => inventoryCategoryNames[category] = true ))
    const taxonomies = Object.keys(inventoryCategoryNames)
    
    this.setState({
      inventoryItems: allInventoryItems.edges,
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
    allInventoryItems(sort: {order: DESC, fields: createdAt}, filter: {id: {ne: "dummy"}}) {
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
    allInventoryItemImages: allS3Object(filter: {Key: {regex: "^inventory/items/" }}) {
      edges {
        node {
          Key
          ...S3Image
        }
      }
    }
  }
`