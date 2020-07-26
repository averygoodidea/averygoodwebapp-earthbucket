import React, { cloneElement, Fragment } from "react";
import { isEmpty } from "lodash";
import styles from "./content-window.module.scss";

const ContentWindow = ({ bannerImage, children }) => {
  return (
    <div data-testid="content-window" className={styles.window}>
      {!isEmpty(bannerImage) && (
        <Fragment>
          {cloneElement(bannerImage, { cn: styles.bannerImage })}
        </Fragment>
      )}
      <div className={styles.info}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
export default ContentWindow;
