import {
  iconAirSvg,
  iconEarthSvg,
  iconFireSvg,
  iconWaterSvg
} from "assets-img";
import { CommentSection, ResourceMap, SEO } from "atoms";
import { ContentWindow, EmailForm } from "molecules";
import { Layout } from "organisms";
import React from "react";
import styles from "./about.module.scss";

const AboutPage = ({ location }) => (
  <Layout location={location} sectionTitle="About">
    <SEO title="About" />
    <div className="row">
      <div className="col-sm-6">
        <div id="firerecord" className={styles.insert}>
          <h2>FireRecord</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <img src={iconFireSvg} alt="" data-service="element" />
        </div>
      </div>
      <div className="col-sm-6">
        <div id="aircdn" className={styles.insert}>
          <h2>AirCdn</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <img src={iconAirSvg} alt="" data-service="element" />
        </div>
      </div>
      <div className="col-sm-6">
        <div id="earthbucket" className={styles.insert}>
          <h2>EarthBucket</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <img src={iconEarthSvg} alt="" data-service="element" />
        </div>
      </div>
      <div className="col-sm-6">
        <div id="waterapi" className={styles.insert}>
          <h2>WaterApi</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <img src={iconWaterSvg} alt="" data-service="element" />
        </div>
      </div>
    </div>
    <ResourceMap />
    <ContentWindow>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <EmailForm />
      <CommentSection mode="fullWidth" />
    </ContentWindow>
  </Layout>
);
export default AboutPage;
