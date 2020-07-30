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

const { location, sectionTitle } = data;

const html = (
  <div>
    <p>Content Area</p>
  </div>
);

export const Home = () => <Layout>{html}</Layout>;
export const Section = () => (
  <Layout location={location} sectionTitle={sectionTitle}>
    {html}
  </Layout>
);
