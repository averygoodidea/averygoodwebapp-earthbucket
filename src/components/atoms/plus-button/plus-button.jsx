import PropTypes from "prop-types";
import React from "react";
import styles from "./plus-button.module.scss";

const PlusButton = ({ onClick, onKeyPress }) => (
  <button
    data-testid="plus-button"
    className={styles.plusButton}
    onClick={onClick}
    onKeyPress={onKeyPress}
  >
    <i data-testid="icon" className="font-icon-plus" />
  </button>
);
PlusButton.propTypes = {
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func
};
PlusButton.defaultProps = {
  onClick: () => {},
  onKeyPress: () => {}
};
export default PlusButton;
