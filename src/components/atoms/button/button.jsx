import classNames from "classnames";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { isEmpty } from "lodash";
import styles from "./button.module.scss";

const Button = ({
  align,
  label,
  fontIcon,
  theme,
  onClick,
  onKeyPress,
  cn,
  isDisabled,
  isIconDisabled
}) => {
  const className = classNames({
    [styles.button]: true,
    [styles[theme]]: true,
    [cn]: !isEmpty(cn),
    [styles.rightAligned]: align === "right" && !isIconDisabled
  });
  return (
    <button
      data-testid="button"
      className={className}
      onClick={onClick}
      onKeyPress={onKeyPress}
      disabled={isDisabled ? "disabled" : false}
    >
      {align === "left" && !isIconDisabled && (
        <Fragment>
          <i data-testid="icon" className={`font-icon-${fontIcon || label}`} />
          <span>{label}</span>
        </Fragment>
      )}
      {align === "right" && !isIconDisabled && (
        <Fragment>
          <span>{label}</span>
          <i data-testid="icon" className={`font-icon-${fontIcon || label}`} />
        </Fragment>
      )}
      {isIconDisabled && <Fragment>{label}</Fragment>}
    </button>
  );
};
Button.propTypes = {
  align: PropTypes.string,
  label: PropTypes.string,
  theme: PropTypes.string,
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  additionalClassName: PropTypes.string,
  isDisabled: PropTypes.bool,
  isIconDisabled: PropTypes.bool
};
Button.defaultProps = {
  align: "left",
  label: "My Button",
  theme: "default",
  onClick: () => {},
  onKeyPress: () => {},
  additionalClassName: "",
  isDisabled: false,
  isIconDisabled: false
};
export default Button;
