import { Logo } from "atoms";
import React from "react";

export default {
  title: "Atoms/Logo",
  component: Logo,
  parameters: {
    jest: ["components/atoms/logo/logo.test.jsx"]
  }
};

export const MainNavigationLogoGraphic = () => <Logo />;
