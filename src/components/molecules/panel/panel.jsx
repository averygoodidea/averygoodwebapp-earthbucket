import { AnchorLink } from "gatsby-plugin-anchor-links";
import PropTypes from "prop-types";
import React from "react";
import styles from "./panel.module.scss";

const Panel = ({ children, label, url }) => (
  <AnchorLink
    data-testid="panel"
    className={styles.panel}
    to={url}
    label={`more info about ${label}`}
  >
    {children}
    <p>{label}</p>
  </AnchorLink>
);

Panel.propTypes = {
  label: PropTypes.string.isRequired
};

export default Panel;
