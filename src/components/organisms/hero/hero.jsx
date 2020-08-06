import {
  iconAirSvg,
  iconCloudFrontSvg,
  iconEarthSvg,
  iconFireSvg,
  iconLambdaSvg,
  iconRoute53Svg,
  iconS3Svg,
  iconWaterSvg
} from "assets-img";

import classNames from "classnames";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { Panel } from "molecules";
import React from "react";
import styles from "./hero.module.scss";

const Hero = () => {
  const className = classNames({
    wrapper: true,
    [styles.heroText]: true
  });
  return (
    <div data-testid="hero" className={styles.hero}>
      <h2>the 4 elements of a very good web app</h2>
      <div className={styles.panels}>
        <Panel label="FireRecord" url="/about/#firerecord">
          <img src={iconFireSvg} alt="" data-service="element" />
          <img src={iconRoute53Svg} alt="AWS Route 53" data-service="aws" />
        </Panel>
        <Panel label="AirCdn" url="/about/#aircdn">
          <img src={iconAirSvg} alt="" data-service="element" />
          <img
            src={iconCloudFrontSvg}
            alt="AWS CloudFront"
            data-service="aws"
          />
        </Panel>
        <Panel label="EarthBucket" url="/about/#earthbucket">
          <img src={iconEarthSvg} alt="" data-service="element" />
          <img src={iconS3Svg} alt="AWS S3" data-service="aws" />
        </Panel>
        <Panel label="WaterApi" url="/about/#waterapi">
          <img src={iconWaterSvg} alt="" data-service="element" />
          <img src={iconLambdaSvg} alt="AWS Lambda" data-service="aws" />
        </Panel>
      </div>
      <div className={className}>
        <p>
          What is the cloud? A collection of random computers that hold our
          websites?
        </p>
        <p>Well...yes.</p>
        <p>But what exactly goes into the cloud to make this possible?</p>
        <p>
          I boil it down to 4 parts:{" "}
          <AnchorLink to="/about/#firerecord">fire</AnchorLink>,{" "}
          <AnchorLink to="/about/#aircdn">air</AnchorLink>,{" "}
          <AnchorLink to="/about/#earthbucket">earth</AnchorLink> and{" "}
          <AnchorLink to="/about/#waterapi">water</AnchorLink>.
        </p>
      </div>
    </div>
  );
};

export default Hero;
