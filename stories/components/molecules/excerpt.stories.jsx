import { Excerpt } from "molecules";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/molecules/excerpt/data";

export default {
  title: "Molecules/Excerpt",
  component: Excerpt,
  parameters: {
    jest: ["components/molecules/excerpt/excerpt.test.jsx"]
  }
};

export const Default = () => <Excerpt {...data} />;
