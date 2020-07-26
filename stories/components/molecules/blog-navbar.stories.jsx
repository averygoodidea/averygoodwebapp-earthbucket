import { BlogNavbar } from "molecules";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/molecules/blog-navbar/data";

export default {
  title: "Molecules/Blog Navbar",
  component: BlogNavbar,
  parameters: {
    jest: ["components/molecules/blog-navbar/blog-navbar.test.jsx"]
  }
};

const { next, previous } = data;

export const Navbar = () => <BlogNavbar next={next} previous={previous} />;
