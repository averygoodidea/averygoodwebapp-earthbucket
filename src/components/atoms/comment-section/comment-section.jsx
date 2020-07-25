/*eslint no-useless-computed-key: ["off"]*/
import classNames from "classnames";
import Valine from "gatsby-plugin-valine";
import PropTypes from "prop-types";
import React from "react";
import "./comment-section.scss";

const CommentSection = ({ isModal, mode, valineOptions }) => {
  const className = classNames({
    ["commentSection"]: true,
    ["fullWidth"]: mode === "fullWidth",
    ["brighten"]: mode === "compact" && !isModal
  });
  return (
    <div data-testid="comment-section" className={className}>
      {typeof window !== `undefined` && (
        <Valine path={window.location.pathname} {...valineOptions} />
      )}
    </div>
  );
};

CommentSection.propTypes = {
  mode: PropTypes.string,
  isModal: PropTypes.bool,
  valineOptions: PropTypes.object
};
CommentSection.defaultProps = {
  isModal: false,
  mode: "compact", // compact|fullWidth
  valineOptions: {}
};

export default CommentSection;
