import { Button } from "atoms";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/atoms/button/data";

export default {
  title: "Atoms/Button",
  component: Button,
};

const { fontIcon, labelText } = data;

export const Text = () => (
  <Button label={labelText} onClick={action("clicked")} />
);
export const Icon = () => (
  <Button
    fontIcon={fontIcon}
    label={labelText}
    onClick={action("clicked")}
  />
);
export const IconRightAlign = () => (
  <Button
    align="right"
    fontIcon={fontIcon}
    label={labelText}
    onClick={action("clicked")}
  />
);
export const IsDisabled = () => (
  <Button isDisabled={true} label={labelText} onClick={action("clicked")} />
);
export const RedTheme = () => (
  <Button label={labelText} onClick={action("clicked")} theme="red" />
);

const story = {
  parameters: {
    jest: ["components/atoms/button/button.test.jsx"]
  }
};
Text.story = story;
Icon.story = story;
IconRightAlign.story = story;
IsDisabled.story = story;
RedTheme.story = story
