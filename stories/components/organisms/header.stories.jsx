import { Header } from "organisms";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/organisms/header/data";

export default {
  title: "Organisms/Header",
  component: Header,
  parameters: {
    jest: ["components/organisms/header/header.test.jsx"]
  }
};

const { location, sectionTitle, siteDescription, siteTitle } = data;

export const WithYourListButton = () => (
  <Header
    location={location}
    siteDescription={siteDescription}
    siteTitle={siteTitle}
  />
);
export const WithSectionTitle = () => (
  <Header
    location={{ pathname: "/blog/" }}
    sectionTitle={sectionTitle}
    siteDescription={siteDescription}
    siteTitle={siteTitle}
  />
);
