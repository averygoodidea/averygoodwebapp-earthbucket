import PropTypes from "prop-types";
import React from "react";
import { isEmpty } from "lodash";
import styles from "./textarea.module.scss";

const Textarea = ({
  label,
  onChange,
  placeholder,
  isDisabled,
  defaultValue,
  name
}) => {
  const props = {};
  if (!isEmpty(name)) {
    props.name = name;
  }

  return (
    <label>
      <div className={styles.label}>{label}</div>
      <textarea
        data-testid="textarea"
        className={styles.textarea}
        placeholder={placeholder}
        onChange={onChange}
        disabled={isDisabled ? "disabled" : false}
        defaultValue={defaultValue}
        {...props}
      />
    </label>
  );
};
Textarea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  defaultValue: PropTypes.string,
  name: PropTypes.string
};
Textarea.defaultProps = {
  label: "add label",
  placeholder: "add placeholder",
  onChange: () => {},
  isDisabled: false
};
export default Textarea;
