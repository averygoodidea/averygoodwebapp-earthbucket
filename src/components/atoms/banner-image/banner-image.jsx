import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { isEmpty } from "lodash";
import styles from "./banner-image.module.scss";

const BannerImage = ({ backgroundPosition, children, cn, src }) => {
  const className = classNames({
    [styles.bannerImage]: true,
    [cn]: !isEmpty(cn)
  });
  return (
    <div
      className={className}
      data-testid="banner-image"
      style={{
        background: `url('${src}') no-repeat`,
        backgroundSize: "cover",
        backgroundPosition
      }}
    >
      <div>{children}</div>
    </div>
  );
};
BannerImage.propTypes = {
  backgroundPosition: PropTypes.string
};
BannerImage.defaultProps = {
  backgroundPosition: "top"
};
export default BannerImage;
