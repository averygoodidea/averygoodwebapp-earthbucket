import { AuthorSignInForm } from "organisms";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Organisms/Author Sign In Form",
  component: AuthorSignInForm,
  parameters: {
    jest: [
      "components/organisms/author-signin-form/author-signin-form.test.jsx"
    ]
  }
};

export const Default = () => <AuthorSignInForm />;
