import { CardCollection } from "organisms";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/organisms/card-collection/data";

export default {
  title: "Organisms/Card Collection",
  component: CardCollection,
  parameters: {
    jest: ["components/organisms/card-collection/card-collection.test.jsx"]
  }
};

export const Default = () => <CardCollection {...data} />;
