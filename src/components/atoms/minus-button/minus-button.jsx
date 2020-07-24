import PropTypes from "prop-types";
import React from "react";
import styles from "./minus-button.module.scss";

const MinusButton = ({ onClick, onKeyPress }) => (
  <button
    data-testid="minus-button"
    className={styles.minusButton}
    onClick={onClick}
    onKeyPress={onKeyPress}
  >
    <i data-testid="icon" className="font-icon-minus" />
  </button>
);
MinusButton.propTypes = {
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func
};
MinusButton.defaultProps = {
  onClick: () => {},
  onKeyPress: () => {}
};
export default MinusButton;
