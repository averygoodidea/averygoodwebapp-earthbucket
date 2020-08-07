import { Button } from "atoms";
import classNames from "classnames";
import { navigate } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styles from "./main-nav.module.scss";

const MainNav = ({ currentView }) => {
  const items = [
    {
      fontIcon: "index",
      target: "/",
      title: "Features"
    },
    {
      fontIcon: "typewriter",
      target: "/blog/",
      title: "Blog"
    },
    {
      fontIcon: "info",
      target: "/about/",
      title: "About"
    }
  ];
  return (
    <nav data-testid="main-nav" className={styles.mainNav}>
      {items.map(({ fontIcon, target, title }, i) => {
        let shouldTabButton;
        if (currentView === target) {
          shouldTabButton = true;
        } else if (
          target === "/" &&
          (currentView.includes("/a/") ||
            currentView.includes("/category/") ||
            currentView.includes("/features/list/"))
        ) {
          shouldTabButton = true;
        } else if (target === "/blog/" && currentView.includes("/b/")) {
          shouldTabButton = true;
        }
        const tabbedButtonClassName = classNames({
          [styles.tabbed]: shouldTabButton
        });
        return (
          <Button
            cn={tabbedButtonClassName}
            key={i}
            fontIcon={fontIcon}
            label={title}
            onClick={e => {
              navigate(target);
            }}
          />
        );
      })}
    </nav>
  );
};
MainNav.propTypes = {
  currentView: PropTypes.string
};
MainNav.defaultProps = {
  currentView: ""
};
export default MainNav;
