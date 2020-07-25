import { PlusButton } from "atoms";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Atoms/Plus Button",
  component: PlusButton
};

export const Icon = () => <PlusButton onClick={action("clicked")} />;

const story = {
  parameters: {
    jest: ["components/atoms/plus-button/plus-button.test.jsx"]
  }
};
Icon.story = story;
