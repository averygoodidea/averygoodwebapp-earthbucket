import { Textarea } from "atoms";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/atoms/textarea/data";

export default {
  title: "Atoms/Textarea",
  component: Textarea
};

export const Empty = () => (
  <Textarea label="Summary" onChange={action("changed")} placeholder={"type something"} />
);
export const WithDefaultData = () => (
  <Textarea
    defaultValue={data.defaultValue}
    label="Summary"
    onChange={action("changed")}
    placeholder={"type something"}
  />
);

const story = {
  parameters: {
    jest: ["components/atoms/textarea/textarea.test.jsx"]
  }
};
Empty.story = story;
WithDefaultData.story = story;
