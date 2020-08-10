import React from "react";

const AVeryGoodWebAppUIDocs = () => (
  <div>
    <h1>A Very Good Web App UI Docs, v1.0</h1>
    <h2>Project Description</h2>
    <p>
      These UI Docs are designed to help explain how the user interface of A
      Very Good Web App is constructed.
    </p>
    <p>
      The web app is built using{" "}
      <a href="https://reactjs.org/" target="_blank">
        React
      </a>
      , and is scaffolded together with{" "}
      <a href="https://gatsbyjs.org/" target="_blank">
        GatsbyJS
      </a>
      .
    </p>
    <p>
      The React components are structured using{" "}
      <a
        href="https://bradfrost.com/blog/post/atomic-web-design/"
        target="_blank"
      >
        atomic web design principles
      </a>
      , as authored by Brad Frost
    </p>
    <p>
      In short, we have broken down the UI into a family of components,
      structured as atoms, molecules and organisms.
    </p>
  </div>
);

export default {
  title: "AVeryGoodWebAppUIDocs",
  component: AVeryGoodWebAppUIDocs
};

export const Summary = () => <AVeryGoodWebAppUIDocs />;
