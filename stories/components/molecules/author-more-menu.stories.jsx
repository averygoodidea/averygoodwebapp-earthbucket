import { AuthorMoreMenu } from "molecules";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/molecules/author-more-menu/data";

export default {
  title: "Molecules/Author More Menu",
  component: AuthorMoreMenu,
  decorators: [storyFn => <div style={{ width: "50%" }}>{storyFn()}</div>],
  parameters: {
    jest: ["components/molecules/author-more-menu/author-more-menu.test.jsx"]
  }
};

const { moreMenuItems } = data;

export const Menu = () => <AuthorMoreMenu items={moreMenuItems} />;
