import { AuthorAlbumPostManager } from "organisms";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/organisms/author-album-post-manager/data";

export default {
  title: "Organisms/Author Album Post Manager",
  component: AuthorAlbumPostManager,
  parameters: {
    jest: [
      "components/organisms/author-album-post-manager/author-album-post-manager.test.jsx"
    ]
  }
};

const { allAlbumPosts, s3, selectedItem } = data;

export const CreateMode = () => (
  <AuthorAlbumPostManager allAlbumPosts={allAlbumPosts} mode={"CREATE"} />
);

export const UpdateMode = () => (
  <AuthorAlbumPostManager
    allAlbumPosts={allAlbumPosts}
    mode={"UPDATE"}
    s3={s3}
    selectedItem={selectedItem}
  />
);
