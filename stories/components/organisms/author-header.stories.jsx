import { AuthorHeader } from "organisms";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/organisms/author-header/data";

export default {
  title: "Organisms/Author Header",
  component: AuthorHeader,
  parameters: {
    jest: ["components/organisms/author-header/author-header.test.jsx"]
  }
};

export const Unauthenticated = () => (
  <AuthorHeader authenticationState="signedOut" {...data} />
);

export const Authenticated = () => (
  <AuthorHeader authenticationState="signedIn" {...data} />
);
