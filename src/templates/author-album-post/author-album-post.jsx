import { AVeryGoodAuthenticator } from "assets-js";
import { SEO } from "atoms";
import { graphql, navigate } from "gatsby";
import { AuthorAlbumPostManager, AuthorLayout } from "organisms";
import React, { Component } from "react";

class AuthorAlbumPostTemplate extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      navbarItems: []
    };
  }
  componentDidMount() {
    const { verifyAuthentication } = AVeryGoodAuthenticator;
    verifyAuthentication().then(result => {
      const { isVerified } = result;
      if (isVerified) {
        this.setState({ isAuthenticated: isVerified });
      } else {
        // navigate to author signin form
        //navigate("/author/", { replace: true });
      }
    });
  }
  render() {
    const { isAuthenticated } = this.state;
    const {
      data: { albumPost },
      location,
      pageContext: { allAlbumPosts, s3ObjectList }
    } = this.props;
    return (
      <AuthorLayout
        isAuthenticated={isAuthenticated}
        location={location}
        sectionTitle="Manage"
      >
        <SEO title="Edit Item" />
        {
          /*isAuthenticated && (*/
          <AuthorAlbumPostManager
            allAlbumPosts={allAlbumPosts}
            mode={"UPDATE"}
            s3={s3ObjectList}
            selectedItem={albumPost}
          />
          /*)*/
        }
      </AuthorLayout>
    );
  }
}
export default AuthorAlbumPostTemplate;
export const pageQuery = graphql`
  query($id: String!) {
    albumPost: albumPosts(id: { eq: $id }) {
      alternative_id
      categories
      id
      images
      moreInfoUrl
      price
      summary
      title
    }
  }
`;
