import { Card } from "molecules";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/molecules/card/data";

export default {
  title: "Molecules/Card",
  component: Card,
  decorators: [storyFn => <div style={{ display: "flex" }}>{storyFn()}</div>],
  parameters: {
    jest: ["components/molecules/card/card.test.jsx"]
  }
};

export const Default = () => <Card {...data} />;
