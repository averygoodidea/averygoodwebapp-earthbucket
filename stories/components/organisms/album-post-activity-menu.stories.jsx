import { AlbumPostActivityMenu } from "organisms";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/organisms/album-post-activity-menu/data";

export default {
  title: "Organisms/Album Post Activity Menu",
  component: AlbumPostActivityMenu,
  decorators: [
    storyFn => (
      <div
        style={{
          width: "50%",
          marginTop: "120px",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        {storyFn()}
      </div>
    )
  ],
  parameters: {
    jest: [
      "components/organisms/album-post-activity-menu/album-post-activity-menu.test.jsx"
    ]
  }
};

const { albumPost } = data;

export const Default = () => (
  <AlbumPostActivityMenu
    item={albumPost}
    moreInfoUrl={albumPost.moreInfoUrl}
    onAlbumPostEvent={e => action(e)}
  />
);
