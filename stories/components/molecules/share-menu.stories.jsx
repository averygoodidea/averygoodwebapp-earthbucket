import { ShareMenu } from "molecules";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/molecules/share-menu/data";

export default {
  title: "Molecules/Share Menu",
  component: ShareMenu,
  decorators: [
    storyFn => (
      <div style={{ width: "50%", marginTop: "100px" }}>{storyFn()}</div>
    )
  ],
  parameters: {
    jest: ["components/molecules/share-menu/share-menu.test.jsx"]
  }
};

const { tags } = data;

export const Default = () => (
  <ShareMenu url={document.location.href} tags={tags} />
);
