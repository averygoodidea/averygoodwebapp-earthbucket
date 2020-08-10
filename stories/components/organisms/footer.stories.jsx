import { Footer } from "organisms";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Organisms/Footer",
  component: Footer,
  parameters: {
    jest: ["components/organisms/footer/footer.test.jsx"]
  }
};

export const Default = () => <Footer />;
