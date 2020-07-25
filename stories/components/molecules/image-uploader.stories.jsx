import { ImageUploader } from "molecules";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/molecules/image-uploader/data";

export default {
  title: "Molecules/Image Uploader",
  component: ImageUploader
};

export const UploadAnImage = () => <ImageUploader label="Upload Image" />;

export const DragToReOrder = () => (
  <ImageUploader
    defaultValue={data.defaultValue}
    label="Drag to Re-Order Images"
  />
);

const story = {
  parameters: {
    jest: ["components/molecules/image-uploader/image-uploader.test.jsx"]
  }
};
UploadAnImage.story = story;
DragToReOrder.story = story;
