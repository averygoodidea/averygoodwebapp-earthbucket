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
    <p>
      The internet cloud is similar to an <em>actual</em> cloud in the sky.
      Whereas, an actual cloud is composed of elements that allow it to form its
      shape and substance, the internet cloud is composed of elements, as well.
      Think of these building blocks as the four elements of the cloud:{" "}
      <strong>Fire</strong>, <strong>Air</strong>, <strong>Earth</strong> and{" "}
      <strong>Water</strong>.
    </p>
    <ResourceMap />
    <div className="row">
      <div className="col-sm-6">
        <div id="firerecord" className={styles.insert}>
          <h2>FireRecord</h2>
          <p>
            Like the fire of the sun, this service sheds light on your cloud so
            that people can see it. This element houses your cloud’s DNS Record,
            which connects your cloud environment to the outside world.
            Specifically, it provides four dns ip addresses that you then take
            and add into your domain name registrar account. Similar to how a
            phone book maps a name to a phone number, your domain name registrar
            maps your domain name to the dns ip addresses. Those ip addresses
            then send the requests from your domain name to your cloud and then
            your cloud sends responses back.
          </p>
          <img src={iconFireSvg} alt="" data-service="element" />
        </div>
      </div>
      <div className="col-sm-6">
        <div id="aircdn" className={styles.insert}>
          <h2>AirCdn</h2>
          <p>
            Like air, this service touches all parts of your cloud. This element
            is your Content Delivery Network, and provides both internal routing
            of requests throughout your cloud, like if a request is made to get
            a file, a web page, or data. Your CDN also provides a caching layer,
            which speeds up the response time of your cloud, while lowering your
            maintenance costs, since cached responses are scores cheaper than
            newly generated responses.
          </p>
          <img src={iconAirSvg} alt="" data-service="element" />
        </div>
      </div>
      <div className="col-sm-6">
        <div id="earthbucket" className={styles.insert}>
          <h2>EarthBucket</h2>
          <p>
            Similar to how earth is stable and orderly, this element is the
            place to store all your app’s static files, such as html, css,
            javascript, images, font files, etc…
          </p>
          <img src={iconEarthSvg} alt="" data-service="element" />
        </div>
      </div>
      <div className="col-sm-6">
        <div id="waterapi" className={styles.insert}>
          <h2>WaterApi</h2>
          <p>
            Similar to how water flows in the direction of whatever force caused
            its motion, this element gets and sets all application generated
            data based on the types of requests it receives.
          </p>
          <img src={iconWaterSvg} alt="" data-service="element" />
        </div>
      </div>
    </div>
    <ContentWindow>
      <p>A Very Good Web App is a distributed application.</p>
      <p>
        Please clone the below repositories and follow each's README
        installation instructions in the following order.
      </p>
      <ol>
        <li>
          <i className="font-icon-github" />
          <a
            href="https://github.com/averygoodidea/averygoodwebapp-infrastructure"
            target="_blank"
            rel="noreferrer"
          >
            https://github.com/averygoodidea/averygoodwebapp-infrastructure
          </a>
        </li>
        <li>
          <i className="font-icon-github" />
          <a
            href="https://github.com/averygoodidea/averygoodwebapp-waterapi"
            target="_blank"
            rel="noreferrer"
          >
            https://github.com/averygoodidea/averygoodwebapp-waterapi
          </a>
        </li>
        <li>
          <i className="font-icon-github" />
          <a
            href="https://github.com/averygoodidea/averygoodwebapp-earthbucket"
            target="_blank"
            rel="noreferrer"
          >
            https://github.com/averygoodidea/averygoodwebapp-earthbucket
          </a>
        </li>
      </ol>
      <EmailForm />
      <CommentSection mode="fullWidth" />
    </ContentWindow>
  </Layout>
);
export default AboutPage;
