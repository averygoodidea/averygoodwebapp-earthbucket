import PropTypes from "prop-types";
import React from "react";
import styles from "./more-button.module.scss";

const MoreButton = ({ onClick, onKeyPress }) => (
  <button
    data-testid="more-button"
    className={styles.moreButton}
    onClick={onClick}
    onKeyPress={onKeyPress}
  >
    <i data-testid="icon" className="font-icon-ellipsis" />
  </button>
);
MoreButton.propTypes = {
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func
};
MoreButton.defaultProps = {
  onClick: () => {},
  onKeyPress: () => {}
};
export default MoreButton;
