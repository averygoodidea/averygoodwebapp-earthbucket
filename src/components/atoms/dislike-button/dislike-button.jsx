import PropTypes from "prop-types";
import React from "react";
import styles from "./dislike-button.module.scss";

const DislikeButton = ({ onClick, onKeyPress }) => (
  <button
    data-testid="dislike-button"
    className={styles.dislikeButton}
    onClick={onClick}
    onKeyPress={onKeyPress}
  >
    <i data-testid="icon" className="font-icon-dislike" />
  </button>
);
DislikeButton.propTypes = {
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func
};
DislikeButton.defaultProps = {
  onClick: () => {},
  onKeyPress: () => {}
};
export default DislikeButton;
