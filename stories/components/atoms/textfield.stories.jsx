import { Textfield } from "atoms";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/atoms/textfield/data";

export default {
  title: "Atoms/Textfield",
  component: Textfield,
  decorators: [storyFn => <div style={{ width: "50%" }}>{storyFn()}</div>],
  parameters: {
    jest: ["components/atoms/textfield/textfield.test.jsx"]
  }
};

export const Empty = () => (
  <Textfield
    label="Name"
    onChange={action("changed")}
    placeholder={"type something"}
  />
);
export const WithDefaultData = () => (
  <Textfield
    defaultValue={data.defaultValue}
    label="Name"
    onChange={action("changed")}
    placeholder={"type something"}
  />
);
