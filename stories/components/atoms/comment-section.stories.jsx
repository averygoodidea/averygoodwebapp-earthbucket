import { CommentSection } from "atoms";
import React from "react";
import { action } from "@storybook/addon-actions";
import "components/atoms/comment-section/comment-section.scss";

export default {
  title: "Atoms/Comment Section",
  component: CommentSection,
};

export const Default = () => (
  <CommentSection />
);

export const OutsideModal = () => (
  <CommentSection isModal={false} />
);


const story = {
  parameters: {
    jest: ["components/atoms/comment-section/comment-section.test.jsx"]
  }
};
Default.story = story;