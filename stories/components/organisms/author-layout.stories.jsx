import { AuthorLayout } from "organisms";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/organisms/author-layout/data";

export default {
  title: "Organisms/Author Layout",
  component: AuthorLayout,
  parameters: {
    jest: ["components/organisms/author-layout/author-layout.test.jsx"]
  }
};

const { location, sectionTitle } = data;

const html = (
  <div>
    <p>Content Area</p>
  </div>
);

export const Unauthenticated = () => (
  <AuthorLayout sectionTitle={sectionTitle}>{html}</AuthorLayout>
);

export const Authenticated = () => (
  <AuthorLayout
    isAuthenticated={true}
    location={location}
    sectionTitle={sectionTitle}
  >
    {html}
  </AuthorLayout>
);
