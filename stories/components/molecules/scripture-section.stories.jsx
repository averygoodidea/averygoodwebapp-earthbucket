import { ScriptureSection } from "molecules";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/molecules/scripture-section/data";

export default {
  title: "Molecules/Scripture Section",
  component: ScriptureSection,
  decorators: [
    storyFn => (
      <div style={{ position: "relative", marginLeft: "50px" }}>
        {storyFn()}
      </div>
    )
  ],
  parameters: {
    jest: ["components/molecules/scripture-section/scripture-section.test.jsx"]
  }
};

export const Default = () => <ScriptureSection {...data} />;
