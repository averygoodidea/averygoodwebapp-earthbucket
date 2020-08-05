/*eslint no-restricted-globals: ["off"]*/
import { AVeryGoodAuthenticator } from "assets-js";
import { Button } from "atoms";
import { Header } from "organisms";
import PropTypes from "prop-types";
import React from "react";
import styles from "./author-header.module.scss";

const AuthorHeader = ({
  authenticationState,
  sectionTitle,
  siteTitle,
  siteDescription
}) => (
  <div data-testid="author-header">
    <Header
      rightColElement={
        authenticationState === "signedIn" ? (
          <div data-testid="author-header-signout-button">
            <Button
              cn={styles.authorHeaderButton}
              label="Sign Out"
              theme="alt"
              onClick={e => {
                e.preventDefault();
                const isConfirmed = confirm(
                  "Are you sure you want to sign out?"
                );
                if (isConfirmed) {
                  AVeryGoodAuthenticator.signOut();
                }
              }}
            />
          </div>
        ) : null
      }
      sectionTitle={sectionTitle}
      siteTitle={siteTitle}
      siteDescription={siteDescription}
    />
  </div>
);

AuthorHeader.propTypes = {
  authenticationState: PropTypes.string,
  siteTitle: PropTypes.string,
  siteDescription: PropTypes.string
};

AuthorHeader.defaultProps = {
  authenticationState: "signedOut", // signedIn | signedOut
  siteTitle: ``,
  siteDescription: ``
};

export default AuthorHeader;
