import { DislikeButton } from "atoms";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Atoms/Dislike Button",
  component: DislikeButton,
};

export const Default = () => (
  <DislikeButton onClick={action("clicked")} />
);

const story = {
  parameters: {
    jest: ["components/atoms/dislike-button/dislike-button.test.jsx"]
  }
};
Default.story = story;