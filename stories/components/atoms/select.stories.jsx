import { Select } from "atoms";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/atoms/select/data";

export default {
  title: "Atoms/Select",
  component: Select
};

export const Empty = () => (
  <Select label="Add Categories" onChange={action("changed")} options={[]} />
);
export const WithDefaultData = () => (
  <Select
    defaultValue={data.defaultValue}
    label="Add Categories"
    onChange={action("changed")}
    options={[]}
  />
);

const story = {
  parameters: {
    jest: ["components/atoms/select/select.test.jsx"]
  }
};
Empty.story = story;
WithDefaultData.story = story;
