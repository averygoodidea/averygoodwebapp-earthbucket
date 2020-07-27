import { AuthorAlbumPostMenu } from "molecules";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/molecules/author-album-post-menu/data";

export default {
  title: "Molecules/Author Album Post Menu",
  component: AuthorAlbumPostMenu,
  decorators: [
    storyFn => (
      <div style={{ marginTop: "10px", width: "30%" }}>{storyFn()}</div>
    )
  ],
  parameters: {
    jest: [
      "components/molecules/author-album-post-menu/author-album-post-menu.test.jsx"
    ]
  }
};

const { albumPosts, selectedItem } = data;

export const Menu = () => (
  <AuthorAlbumPostMenu
    onPlusButtonClick={action("clicked")}
    albumPosts={albumPosts}
  />
);

export const WithSelectedItem = () => (
  <AuthorAlbumPostMenu
    onPlusButtonClick={action("clicked")}
    albumPosts={albumPosts}
    selectedItem={selectedItem}
  />
);
