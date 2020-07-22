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
  <Header
    rightColElement={
      authenticationState === "signedIn" ? (
        <Button
          cn={styles.authorHeaderButton}
          label="Sign Out"
          theme="red"
          onClick={e => {
            e.preventDefault();
            const isConfirmed = confirm("Are you sure you want to sign out?");
            if (isConfirmed) {
              AVeryGoodAuthenticator.signOut();
            }
          }}
        />
      ) : null
    }
    sectionTitle={sectionTitle}
    siteTitle={siteTitle}
    siteDescription={siteDescription}
  />
);

AuthorHeader.propTypes = {
  authenticationState: PropTypes.string,
  siteTitle: PropTypes.string,
  siteDescription: PropTypes.string
};

AuthorHeader.defaultProps = {
  authenticationState: "",
  siteTitle: ``,
  siteDescription: ``
};

export default AuthorHeader;
