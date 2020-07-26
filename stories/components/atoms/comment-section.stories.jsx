import { CommentSection } from "atoms";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Atoms/Comment Section",
  component: CommentSection,
  parameters: {
    jest: ["components/atoms/comment-section/comment-section.test.jsx"]
  }
};

const valineOptions = {
  lang: "en",
  langmode: {
    nick: "nickname",
    mail: "email",
    nickFail: "Nick name cannot be less than 3 characters.",
    link: "Website"
  },
  enableqq: "true",
  placeholder: `Leave a comment.`,
  requiredfields: ["nick", "mail"]
};

export const CompactInsideModal = () => (
  <CommentSection isModal={true} valineOptions={valineOptions} />
);

export const FullWidthOutsideModal = () => (
  <CommentSection
    isModal={false}
    mode="fullWidth"
    valineOptions={valineOptions}
  />
);
