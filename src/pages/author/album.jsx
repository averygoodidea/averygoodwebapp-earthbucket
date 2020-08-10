import { AVeryGoodAuthenticator } from "assets-js";
import { SEO } from "atoms";
import { graphql, navigate } from "gatsby";
import { AuthorAlbumPostManager, AuthorLayout } from "organisms";
import React, { Component } from "react";

class AuthorAlbumPage extends Component {
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
        navigate("/author/", { replace: true });
      }
    });
  }
  render() {
    const { isAuthenticated } = this.state;
    const {
      data: { allAlbumPosts },
      location
    } = this.props;
    return (
      <AuthorLayout
        isAuthenticated={isAuthenticated}
        location={location}
        sectionTitle="Manage"
      >
        <SEO title="Create Item" />
        {isAuthenticated && (
          <AuthorAlbumPostManager
            allAlbumPosts={allAlbumPosts.edges}
            mode={"CREATE"}
          />
        )}
      </AuthorLayout>
    );
  }
}
export default AuthorAlbumPage;
export const pageQuery = graphql`
  query {
    allAlbumPosts(
      sort: { order: DESC, fields: createdAt }
      filter: { id: { ne: "dummy" } }
    ) {
      edges {
        node {
          alternative_id
          id
          categories
          createdAt
          images
          moreInfoUrl
          slugId
          summary
          title
        }
      }
    }
  }
`;
