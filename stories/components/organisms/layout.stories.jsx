import { Layout } from "organisms";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/organisms/layout/data";

export default {
  title: "Organisms/Layout",
  component: Layout,
  parameters: {
    jest: ["components/organisms/layout/layout.test.jsx"]
  }
};

const { sectionTitle } = data;

const html = (
  <div>
    <p>Content Area</p>
  </div>
);

export const Default = () => (
  <Layout sectionTitle={sectionTitle}>{html}</Layout>
);
