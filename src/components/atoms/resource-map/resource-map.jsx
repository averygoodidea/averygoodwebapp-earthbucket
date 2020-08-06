import { resourceMapSvg } from "assets-img";
import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import styles from "./resource-map.module.scss";

const ResourceMap = () => (
  <div className={styles.resourceMap}>
    <Zoom>
      <img src={resourceMapSvg} alt="resource map" width="100%" />
    </Zoom>
  </div>
);

export default ResourceMap;
