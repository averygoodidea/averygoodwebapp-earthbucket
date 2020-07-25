import { Logo } from "atoms";
import React from "react";

export default {
  title: "Atoms/Logo",
  component: Logo
};

export const MainNavigationLogoGraphic = () => <Logo />;

const story = {
  parameters: {
    jest: ["components/atoms/logo/logo.test.jsx"]
  }
};
MainNavigationLogoGraphic.story = story;
