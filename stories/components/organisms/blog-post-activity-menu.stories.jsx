import { BlogPostActivityMenu } from "organisms";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/organisms/blog-post-activity-menu/data";

export default {
  title: "Organisms/Blog Post Activity Menu",
  component: BlogPostActivityMenu,
  decorators: [
    storyFn => (
      <div
        style={{
          marginTop: "120px"
        }}
      >
        {storyFn()}
      </div>
    )
  ],
  parameters: {
    jest: [
      "components/organisms/blog-post-activity-menu/blog-post-activity-menu.test.jsx"
    ]
  }
};

export const Default = () => <BlogPostActivityMenu {...data} />;
