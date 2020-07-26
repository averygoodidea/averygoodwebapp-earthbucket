import { AuthorMoreMenu } from "molecules";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/molecules/author-more-menu/data";

export default {
  title: "Molecules/Author More Menu",
  component: AuthorMoreMenu
};

const { moreMenuItems } = data;

export const Menu = () => <AuthorMoreMenu items={moreMenuItems} />;

const story = {
  parameters: {
    jest: ["components/molecules/author-more-menu/author-more-menu.test.jsx"]
  }
};
Menu.story = story;
