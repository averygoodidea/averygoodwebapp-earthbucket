import PropTypes from "prop-types";
import React from "react";
import styles from "./share-button.module.scss";

const ShareButton = ({ onClick, onKeyPress }) => (
  <button
    data-testid="share-button"
    className={styles.shareButton}
    onClick={onClick}
    onKeyPress={onKeyPress}
  >
    <i data-testid="icon" className="font-icon-share" />
  </button>
);
ShareButton.propTypes = {
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func
};
ShareButton.defaultProps = {
  onClick: () => {},
  onKeyPress: () => {}
};
export default ShareButton;
