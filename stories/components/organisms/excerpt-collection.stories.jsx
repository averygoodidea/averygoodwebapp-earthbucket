import { ExcerptCollection } from "organisms";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/organisms/excerpt-collection/data";

export default {
  title: "Organisms/Excerpt Collection",
  component: ExcerptCollection,
  parameters: {
    jest: [
      "components/organisms/excerpt-collection/excerpt-collection.test.jsx"
    ]
  }
};

export const Default = () => <ExcerptCollection {...data} />;
