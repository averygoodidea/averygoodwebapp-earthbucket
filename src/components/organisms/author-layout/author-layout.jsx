import { graphql, navigate, useStaticQuery } from "gatsby";
import { AuthorNavbar } from "molecules";
import { AuthorHeader, Footer } from "organisms";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import "../layout/layout.scss";

const AuthorLayout = ({
  children,
  isAuthenticated,
  location,
  sectionTitle
}) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);
  // set nav bar items
  const navbarItems = [
    {
      fontIcon: "inventory-item",
      onClick: e => navigate(e.targetView),
      targetView: "/author/album/",
      title: "Album Posts"
    },
    {
      fontIcon: "adjust",
      onClick: e => navigate(e.targetView),
      targetView: "/author/site-settings/",
      title: "Site Settings"
    }
  ];

  const currentView = location.pathname;

  return (
    <div data-testid="author-layout">
      <div id="background-graphic" />
      <main>
        <Fragment>
          <AuthorHeader
            authenticationState={isAuthenticated ? "signedIn" : "signedOut"}
            sectionTitle={sectionTitle}
            siteTitle={data.site.siteMetadata.title}
            siteDescription={data.site.siteMetadata.description}
          />
          <div className="wrapper">
            <div className="container-fluid">
              {isAuthenticated && (
                <AuthorNavbar items={navbarItems} currentView={currentView} />
              )}
              {children}
            </div>
          </div>
          <Footer />
        </Fragment>
      </main>
    </div>
  );
};

AuthorLayout.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool,
  location: PropTypes.object,
  sectionTitle: PropTypes.string
};
AuthorLayout.defaultProps = {
  isAuthenticated: false,
  location: {}
};

export default AuthorLayout;
