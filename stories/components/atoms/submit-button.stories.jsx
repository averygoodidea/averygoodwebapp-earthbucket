import { SubmitButton } from "atoms";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Atoms/Submit Button",
  component: SubmitButton
};

export const Text = () => <SubmitButton onClick={action("clicked")} />;

const story = {
  parameters: {
    jest: ["components/atoms/submit-button/submit-button.test.jsx"]
  }
};
Text.story = story;
