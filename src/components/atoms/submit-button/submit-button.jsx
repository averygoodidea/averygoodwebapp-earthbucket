import PropTypes from "prop-types";
import React from "react";
import styles from "./submit-button.module.scss";

const SubmitButton = ({ onClick, onKeyPress, value, isDisabled }) => (
  <input
    data-testid="submit-button"
    className={styles.button}
    type="submit"
    value={value}
    onClick={onClick}
    onKeyPress={onKeyPress}
    disabled={isDisabled ? "disabled" : false}
  />
);
SubmitButton.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  isDisabled: PropTypes.bool
};
SubmitButton.defaultProps = {
  value: "Submit",
  onClick: () => {},
  onKeyPress: () => {},
  isDisabled: false
};
export default SubmitButton;
