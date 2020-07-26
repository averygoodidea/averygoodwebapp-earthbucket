import { MinusButton } from "atoms";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Atoms/Minus Button",
  component: MinusButton,
  parameters: {
    jest: ["components/atoms/minus-button/minus-button.test.jsx"]
  }
};

export const Icon = () => <MinusButton onClick={action("clicked")} />;
