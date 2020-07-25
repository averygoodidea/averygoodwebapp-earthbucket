import classNames from "classnames";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import ReactLoading from "react-loading";
import styles from "./toast.module.scss";
import "./toast.scss";

const Toast = ({
  fontIcon,
  htmlMessage,
  loadingState,
  message,
  fullWidth,
  to
}) => {
  const className = classNames({
    [styles.toast]: true,
    [styles.fullWidth]: fullWidth
  });

  const html = (
    <div className={className}>
      {fontIcon && <i data-testid="icon" className={`font-icon-${fontIcon}`} />}
      {!fontIcon && loadingState === "loading" && (
        <div className={styles.loading}>
          <ReactLoading
            type={"spin"}
            color={"#915535"}
            width={28}
            height={28}
          />
        </div>
      )}
      {htmlMessage ? (
        <div dangerouslySetInnerHTML={{ __html: htmlMessage }} />
      ) : (
        <p>{message}</p>
      )}
    </div>
  );

  return (
    <Fragment>
      {to && (
        <Link data-testid="toast" to={to} className={styles.link}>
          {html}
        </Link>
      )}
      {!to && (
        <Fragment>
          <div data-testid="toast">{html}</div>
        </Fragment>
      )}
    </Fragment>
  );
};
Toast.propTypes = {
  message: PropTypes.string,
  fontIcon: PropTypes.string,
  loadingState: PropTypes.string,
  htmlMessage: PropTypes.string,
  fullWidth: PropTypes.bool,
  to: PropTypes.string
};
Toast.defaultProps = {
  message: "Toast Message!",
  fullWidth: false
};
export default Toast;
