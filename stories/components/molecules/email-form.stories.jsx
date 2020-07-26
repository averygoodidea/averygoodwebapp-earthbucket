import { EmailForm } from "molecules";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Molecules/Email Form",
  component: EmailForm,
  decorators: [
    storyFn => (
      <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
        {storyFn()}
      </div>
    )
  ],
  parameters: {
    jest: ["components/molecules/email-form/email-form.test.jsx"]
  }
};

export const Default = () => <EmailForm />;
