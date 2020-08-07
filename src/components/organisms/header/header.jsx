import { LocalStorageList } from "assets-js";
import { Button, Logo } from "atoms";
import { graphql, Link, navigate, useStaticQuery } from "gatsby";
import { MainNav } from "molecules";
import PropTypes from "prop-types";
import React from "react";
import styles from "./header.module.scss";
import "./header.scss";

const Header = ({
  location,
  rightColElement,
  sectionTitle,
  siteDescription,
  siteTitle
}) => {
  const data = useStaticQuery(graphql`
    query {
      allAlbumPosts(filter: { id: { ne: "dummy" } }) {
        edges {
          node {
            alternative_id
          }
        }
      }
    }
  `);
  const albumPostIds = [];
  data.allAlbumPosts.edges.forEach(edge => {
    albumPostIds.push(edge.node.alternative_id);
  });
  const currentView = location.pathname;
  const shouldShowListButton =
    currentView === "/" ||
    currentView.includes("/a/") ||
    currentView.includes("/category/") ||
    currentView === "/features/list/";
  // get ids from local storage and filter out any that don't exist in the database anymore.
  const listLength =
    typeof window !== `undefined`
      ? LocalStorageList.getPostIds().filter(postId =>
          albumPostIds.includes(postId)
        ).length
      : 0;
  return (
    <header data-testid="header" className={styles.header}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2 col-md-3">
            <div className={styles.logo}>
              <Logo />
            </div>
          </div>
          <div className="col-sm-6 col-md-5">
            <div id="hero-text" className={styles.heroText}>
              <h1>
                <Link to="/">{siteTitle}</Link>
              </h1>
              <p>{siteDescription}</p>
            </div>
          </div>
          <div className="col-sm-offset-1 col-sm-3 col-md-offset-1 col-md-2">
            {rightColElement || <MainNav currentView={currentView} />}
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-9 col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-8">
            {shouldShowListButton && (
              <div
                data-testid="header-your-list-button"
                className={styles.listButton}
              >
                {listLength > 0 && (
                  <div
                    data-testid="header-your-list-length"
                    className={styles.amount}
                    onClick={e => {
                      e.preventDefault();
                      navigate("/features/list/");
                    }}
                  >
                    {listLength}
                  </div>
                )}
                <Button
                  cn={currentView === "/features/list/" ? styles.tabbed : ""}
                  label="Your Fave Features"
                  fontIcon="school-backpack"
                  onClick={e => {
                    e.preventDefault();
                    navigate("/features/list/");
                  }}
                />
              </div>
            )}
            {!shouldShowListButton && sectionTitle && (
              <div
                data-testid="header-section-title"
                className={styles.sectionTitle}
              >
                <h1>{sectionTitle}</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  locaton: PropTypes.object,
  rightColElement: PropTypes.object,
  siteTitle: PropTypes.string,
  siteDescription: PropTypes.string
};

Header.defaultProps = {
  location: { pathname: "" },
  rightColElement: null,
  siteTitle: ``,
  siteDescription: ``
};

export default Header;
