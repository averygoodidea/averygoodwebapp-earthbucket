import PropTypes from "prop-types";
import React from "react";
import styles from "./close-button.module.scss";

const CloseButton = ({ onClick, onKeyPress }) => (
  <button
    data-testid="close-button"
    className={styles.closeButton}
    onClick={onClick}
    onKeyPress={onKeyPress}
  >
    <i data-testid="icon" className="font-icon-close" />
  </button>
);
CloseButton.propTypes = {
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func
};
CloseButton.defaultProps = {
  onClick: () => {},
  onKeyPress: () => {}
};
export default CloseButton;
