import { CloseButton } from "atoms";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Atoms/Close Button",
  component: CloseButton
};

export const Icon = () => <CloseButton onClick={action("clicked")} />;

const story = {
  parameters: {
    jest: ["components/atoms/close-button/close-button.test.jsx"]
  }
};
Icon.story = story;
