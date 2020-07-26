import { LikeButton } from "atoms";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Atoms/Like Button",
  component: LikeButton,
  parameters: {
    jest: ["components/atoms/like-button/like-button.test.jsx"]
  }
};

export const Icon = () => <LikeButton onClick={action("clicked")} />;
