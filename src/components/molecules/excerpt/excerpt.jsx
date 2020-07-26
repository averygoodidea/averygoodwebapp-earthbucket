import { Button } from "atoms";
import { Link, navigate } from "gatsby";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import styles from "./excerpt.module.scss";

const Excerpt = ({
  author,
  backgroundPosition,
  date,
  img,
  summary,
  title,
  url
}) => {
  return (
    <div data-testid="excerpt" className={styles.window}>
      <div
        data-testid="excerpt-image"
        className={styles.colA}
        onClick={() => navigate(url)}
        style={{
          background: `url('${img.src}') no-repeat`,
          backgroundSize: "cover",
          backgroundPosition
        }}
      ></div>
      <div className={styles.colB}>
        <div className={styles.content}>
          <Link data-testid="excerpt-title" to={url}>
            <h2>{title}</h2>
          </Link>
          <p>{summary}</p>
          <Button label="Read Full Article" onClick={() => navigate(url)} />
          <aside>
            <p>
              <em>{author}</em>
            </p>
            <p>
              <em>{moment(date).format("MMMM Do YYYY, h:mma")}</em>
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
};
Excerpt.propTypes = {
  author: PropTypes.string,
  backgroundPosition: PropTypes.string,
  date: PropTypes.string,
  img: PropTypes.object,
  summary: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string
};
Excerpt.defaultProps = {
  backgroundPosition: "center"
};
export default Excerpt;
