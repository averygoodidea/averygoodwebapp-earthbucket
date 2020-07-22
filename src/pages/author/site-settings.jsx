import { AVeryGoodAuthenticator } from "assets-js";
import { SEO } from "atoms";
import { navigate } from "gatsby";
import { AuthorLayout, AuthorSiteSettingsManager } from "organisms";
import React, { Component } from "react";

class AuthorSiteSettingsPage extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false
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
    const { location } = this.props;
    return (
      <AuthorLayout
        isAuthenticated={isAuthenticated}
        location={location}
        sectionTitle="Manage"
      >
        <SEO title="Site Settings" />
        {isAuthenticated && <AuthorSiteSettingsManager />}
      </AuthorLayout>
    );
  }
}
export default AuthorSiteSettingsPage;
