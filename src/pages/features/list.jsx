import { AVeryGoodNarrowcaster, LocalStorageList } from "assets-js";
import { BannerImage, Button, SEO } from "atoms";
import { graphql, navigate } from "gatsby";
import { ContentWindow } from "molecules";
import { CardCollection, Layout } from "organisms";
import React, { Component, Fragment } from "react";
import { isEmpty } from "lodash";
import styles from "./list.module.scss";

class ItemsListPage extends Component {
  constructor() {
    super();
    this.state = {
      s3: {}
    };
  }
  componentDidMount() {
    const { allAlbumPosts, allS3Object } = this.props.data;
    const s3 = {};
    allS3Object.edges.forEach(({ node }) => {
      s3[node.Key] = node.image;
    });
    let albumPosts = {};
    allAlbumPosts.edges.forEach(edge => {
      albumPosts[edge.node.alternative_id] = edge;
    });
    // get only the album posts that have ids in local storage. Also, filter out any ids found in local storage that doesn't exist in the data store anymore.
    albumPosts = LocalStorageList.getPostIds()
      .map(postId => albumPosts[postId])
      .filter(id => !isEmpty(id));
    this.setState({
      albumPosts,
      s3
    });
  }
  onEmailButtonClick() {
    const { albumPosts } = this.state;
    let message = "Your List of Favorites:";
    albumPosts.forEach(
      ({ node: { categories, moreInfoUrl, price, title } }, i) => {
        message += "\n";
        message += `\n${i + 1}. ${title}`;
        message += `, $${price}`;
        message += `\n${moreInfoUrl}`;
        categories.forEach(
          (category, i) => (message += `${i === 0 ? "" : ","}${category}`)
        );
      }
    );
    AVeryGoodNarrowcaster.share("email", "", message);
  }
  render() {
    const { albumPosts, s3 } = this.state;
    const { data, location } = this.props;
    const bannerImage = (
      <BannerImage
        backgroundPosition="center"
        cn={styles.bannerImage}
        src={data.eliYourListJpg.fluid.originalImg}
      >
        <h2>Below is the list of items that you've collected.</h2>
      </BannerImage>
    );
    return (
      <Layout location={location}>
        <SEO title="Your List" />
        <ContentWindow bannerImage={bannerImage}>
          <div className={styles.message}>
            {albumPosts && albumPosts.length === 0 && (
              <Fragment>
                <p className={styles.emptyMessage}>
                  Your list is <strong>empty</strong>.<br />
                  You can add items by pressing the "like"{" "}
                  <span>
                    <i className="font-icon-like" />
                  </span>{" "}
                  button on an album post.
                  <Button
                    cn={styles.button}
                    fontIcon="index"
                    label="Go to Features"
                    onClick={e => {
                      e.preventDefault();
                      navigate("/");
                    }}
                  />
                </p>
              </Fragment>
            )}
            {albumPosts && albumPosts.length > 0 && (
              <Fragment>
                <p>
                  <span>
                    The below list is stored in your browser and{" "}
                    <strong>will be deleted when you clear your cache</strong>.
                    <br />
                    You should email this list to yourself every now and then to
                    keep a back-up.
                  </span>
                  <Button
                    cn={styles.button}
                    fontIcon="envelope"
                    label="Send this list to your email"
                    onClick={e => {
                      e.preventDefault();
                      this.onEmailButtonClick();
                    }}
                  />
                </p>
              </Fragment>
            )}
          </div>
        </ContentWindow>
        <CardCollection albumPosts={albumPosts} location={location} s3={s3} />
      </Layout>
    );
  }
}
export default ItemsListPage;
export const pageQuery = graphql`
  query {
    allAlbumPosts(filter: { id: { ne: "dummy" } }) {
      edges {
        node {
          alternative_id
          categories
          id
          images
          moreInfoUrl
          slugId
          title
        }
      }
    }
    allS3Object(filter: { Key: { regex: "/album/posts/" } }) {
      edges {
        node {
          Key
          ...S3Image
        }
      }
    }
    eliYourListJpg: imageSharp(
      fluid: { originalName: { eq: "eli-yourlist.jpg" } }
    ) {
      id
      fluid {
        originalImg
        src
      }
    }
  }
`;
