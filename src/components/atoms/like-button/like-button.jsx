import PropTypes from "prop-types";
import React from "react";
import styles from "./like-button.module.scss";

const LikeButton = ({ onClick, onKeyPress }) => (
  <button
    data-testid="like-button"
    className={styles.likeButton}
    onClick={onClick}
    onKeyPress={onKeyPress}
  >
    <i data-testid="icon" className="font-icon-like" />
  </button>
);
LikeButton.propTypes = {
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func
};
LikeButton.defaultProps = {
  onClick: () => {},
  onKeyPress: () => {}
};
export default LikeButton;
