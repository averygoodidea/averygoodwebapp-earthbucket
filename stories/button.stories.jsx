import { Button } from "atoms";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/atoms/button/data";
import "../src/components/organisms/layout/layout.scss";

export default {
  title: "Button",
  component: Button
};

const { fontIcon, labelText } = data;

export const BasicButton = () => <Button fontIcon={fontIcon} label={labelText} onClick={action("clicked")} />;
export const BasicButtonIconAlignedRight = () => <Button align="right" fontIcon={fontIcon} label={labelText} onClick={action("clicked")} />;

const story = {
  parameters: {
    jest: ["components/atoms/button/button.test.jsx"]
  }
};
BasicButton.story = story;
