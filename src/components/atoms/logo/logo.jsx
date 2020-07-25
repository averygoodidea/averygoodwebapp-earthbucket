import { Link } from "gatsby";
import React from "react";
import styles from "./logo.module.scss";

const Logo = () => (
  <Link data-testid="logo" to="/" className={styles.logo}>
    <i className="font-icon-school-backpack" />
  </Link>
);
export default Logo;
