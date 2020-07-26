import { DislikeButton } from "atoms";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Atoms/Dislike Button",
  component: DislikeButton,
  parameters: {
    jest: ["components/atoms/dislike-button/dislike-button.test.jsx"]
  }
};

export const Icon = () => <DislikeButton onClick={action("clicked")} />;
