import { Card } from "molecules";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/molecules/card/data";

export default {
  title: "Molecules/Card",
  component: Card
};

export const Default = () => <Card {...data} />;

const story = {
  parameters: {
    jest: ["components/molecules/card/card.test.jsx"]
  }
};
Default.story = story;
