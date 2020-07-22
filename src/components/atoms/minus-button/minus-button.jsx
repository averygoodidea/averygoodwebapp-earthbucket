import PropTypes from "prop-types";
import React from "react";
import styles from "./minus-button.module.scss";

const MinusButton = ({ onClick, onKeyPress }) => (
  <button
    className={styles.minusButton}
    onClick={onClick}
    onKeyPress={onKeyPress}
  >
    <i className="font-icon-minus" />
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
