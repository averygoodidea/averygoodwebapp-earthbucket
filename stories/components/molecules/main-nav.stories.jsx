import { MainNav } from "molecules";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/molecules/main-nav/data";

export default {
  title: "Molecules/Main Nav",
  component: MainNav,
  decorators: [
    storyFn => (
      <div style={{ position: "relative", marginLeft: "50px" }}>
        {storyFn()}
      </div>
    )
  ],
  parameters: {
    jest: ["components/molecules/main-nav/main-nav.test.jsx"]
  }
};

export const Default = () => <MainNav {...data} />;
