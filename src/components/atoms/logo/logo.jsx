import { Link } from "gatsby";
import React from "react";
import styles from "./logo.module.scss";

const Logo = () => (
  <Link to="/" className={styles.logo}>
    <i className="font-icon-school-backpack"></i>
  </Link>
);
export default Logo;
