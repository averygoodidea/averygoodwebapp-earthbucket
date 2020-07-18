import React, { Component, Fragment } from "react"
import { graphql, navigate } from 'gatsby'
import { BannerImage, Button, SEO } from 'atoms'
import { ContentWindow } from 'molecules'
import { CardCollection, Layout } from 'organisms'
import styles from './list.module.scss'
import { isEmpty } from 'lodash'
import AveryGoodNarrowcaster from '../../assets/js/averygoodnarrowcaster'
// import SEO from "../components/seo"

class ItemsListPage extends Component {
  constructor () {
    super()
    this.state = {
      s3: {}
    }
  }
  componentDidMount() {
    const { allAlbumPosts, allS3Object } = this.props.data
    const s3 = {}
    allS3Object.edges.forEach( ({ node }) => {
      s3[node.Key] = node.image
    })
    const inventoryItems = {}
    allAlbumPosts.edges.forEach( edge => {
      inventoryItems[edge.node.alternative_id] = edge
    })
    let items = []
    if (window.localStorage.getItem('itemIds')) {
      // get inventory items by local storage id and filter out any that don't exist in the database anymore.
      items = window.localStorage.getItem('itemIds').split(',').map( itemId => inventoryItems[itemId]).filter( item => !isEmpty(item))
    }
    this.setState({
      inventoryItems: items,
      s3
    })
  }
  onEmailButtonClick() {
    const { inventoryItems } = this.state
    let message = 'My Faith Inventory List:'
    inventoryItems.forEach( ( { node: { categories, moreInfoUrl, price, title } }, i) => {
      message += '\n'
      message += `\n${i + 1}. ${title}`
      message += `, $${price}`
      message += `\n${moreInfoUrl}`
      categories.forEach( (category, i) => message += `${i === 0 ? '' : ','}${category}` )
    })
    AveryGoodNarrowcaster.share('email', '', message)
  }
  render() {
    const {
      amountToShow,
      inventoryItems,
      s3
    } = this.state
    const { data, location } = this.props
    const bannerImage = (
      <BannerImage
        backgroundPosition="center"
        cn={styles.bannerImage}
        src={data.eliYourListJpg.fluid.originalImg}>
        <h2>Below is the list of items that you've collected.</h2>
      </BannerImage>
    )
    return (
      <Layout location={location}>
        <SEO title='Your List' />
        <ContentWindow bannerImage={bannerImage}>
          <div className={styles.message}>
            {inventoryItems && inventoryItems.length === 0 && <Fragment>
              <p className={styles.emptyMessage}>Your inventory list is <strong>empty</strong>.<br />You can add items by pressing the "like" <span><i className="font-icon-like" /></span> button on an inventory item post.
                <Button
                    cn={styles.button}
                    fontIcon='inventory-items'
                    label='Go to Inventory'
                    onClick={ e => {
                      e.preventDefault()
                      navigate('/')
                    }}
                  />
              </p>
            </Fragment>}
            {inventoryItems && inventoryItems.length > 0 && <Fragment>
              <p><span>The below list is stored in your browser and <strong>will be deleted when you clear your cache</strong>.<br />You should email this list to yourself every now and then to keep a back-up.</span>
                <Button
                    cn={styles.button}
                    fontIcon='envelope'
                    label='Send this list to your email'
                    onClick={ e => {
                      e.preventDefault()
                      this.onEmailButtonClick()
                    }}
                    theme='red'
                  />
              </p>
            </Fragment>}
          </div>
        </ContentWindow>
        <CardCollection
          inventoryItems={inventoryItems}
          location={location}
          s3={s3}
        />
      </Layout>
    )
  }
}
export default ItemsListPage
export const pageQuery = graphql`
  query {
    allAlbumPosts(filter: {id: {ne: "dummy"}}) {
      edges {
        node {
          alternative_id
          categories
          id
          images
          moreInfoUrl
          price
          slugId
          title
        }
      }
    }
    allS3Object(filter: {Key: {regex: "^inventory/items/" }}) {
      edges {
        node {
          Key
          ...S3Image
        }
      }
    }
    eliYourListJpg: imageSharp(fluid: {originalName: {eq: "eli-yourlist.jpg"}})  {
      id
        fluid {
          originalImg
          src
        }
    }
  }
`