import { LikeButton } from "atoms";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Atoms/Like Button",
  component: LikeButton
};

export const Icon = () => <LikeButton onClick={action("clicked")} />;

const story = {
  parameters: {
    jest: ["components/atoms/like-button/like-button.test.jsx"]
  }
};
Icon.story = story;
