import { Toast } from "atoms";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/atoms/toast/data";

export default {
  title: "Atoms/Toast",
  component: Toast,
  parameters: {
    jest: ["components/atoms/toast/toast.test.jsx"]
  }
};

const { fontIcon, htmlMessage, message, to } = data;

export const Message = () => <Toast message={message} />;
export const MessageWithIcon = () => (
  <Toast fontIcon={fontIcon} message={message} />
);
export const HTMLMessage = () => (
  <Toast fontIcon={fontIcon} htmlMessage={htmlMessage} />
);
export const LinkedMessage = () => (
  <Toast fontIcon={fontIcon} htmlMessage={htmlMessage} to={to} />
);
export const FullWidth = () => (
  <Toast fontIcon={fontIcon} fullWidth={true} message={message} />
);
