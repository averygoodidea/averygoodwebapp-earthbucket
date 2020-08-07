import { Button } from "atoms";
import { navigate } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import { isEmpty } from "lodash";
import styles from "./blog-navbar.module.scss";

const BlogNavbar = ({ next, previous }) => {
  return (
    <div className={styles.navbar}>
      {!isEmpty(previous) ? (
        <Button
          cn={styles.previous}
          fontIcon="previous"
          label={previous.title}
          onClick={() => navigate(`/b/${previous.slug}/`)}
        />
      ) : (
        <div className={styles.disabled} />
      )}
      <Button
        cn={styles.blogIndexButton}
        fontIcon="typewriter"
        label="Blog Index"
        onClick={() => navigate("/blog/")}
      />
      {!isEmpty(next) ? (
        <Button
          align="right"
          cn={styles.next}
          fontIcon="next"
          label={next.title}
          onClick={() => navigate(`/b/${next.slug}/`)}
        />
      ) : (
        <div className={styles.disabled} />
      )}
    </div>
  );
};
BlogNavbar.propTypes = {
  next: PropTypes.object,
  previous: PropTypes.object
};
BlogNavbar.defaultProps = {
  next: {},
  previous: {}
};
export default BlogNavbar;
