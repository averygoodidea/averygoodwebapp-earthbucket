import { iconLogoSvg } from "assets-img";
import { Link } from "gatsby";
import React from "react";
import styles from "./logo.module.scss";

const Logo = () => (
  <Link data-testid="logo" to="/" className={styles.logo}>
    <img src={iconLogoSvg} alt="Logo for A Very Good Web App" />
  </Link>
);
export default Logo;
