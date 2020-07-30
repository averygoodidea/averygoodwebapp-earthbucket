import { AuthorSiteSettingsManager } from "organisms";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Organisms/Author Site Settings Manager",
  component: AuthorSiteSettingsManager,
  parameters: {
    jest: [
      "components/organisms/author-site-settings-manager/author-site-settings-manager.test.jsx"
    ]
  }
};

export const Default = () => <AuthorSiteSettingsManager />;
