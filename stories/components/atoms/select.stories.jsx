import { Select } from "atoms";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/atoms/select/data";

export default {
  title: "Atoms/Select",
  component: Select,
  decorators: [storyFn => <div style={{ width: "50%" }}>{storyFn()}</div>],
  parameters: {
    jest: ["components/atoms/select/select.test.jsx"]
  }
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
