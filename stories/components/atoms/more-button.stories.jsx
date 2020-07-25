import { MoreButton } from "atoms";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Atoms/More Button",
  component: MoreButton
};

export const Icon = () => <MoreButton onClick={action("clicked")} />;

const story = {
  parameters: {
    jest: ["components/atoms/more-button/more-button.test.jsx"]
  }
};
Icon.story = story;
