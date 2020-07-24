import { ImageUploader } from "atoms";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from 'components/atoms/image-uploader/data'

export default {
  title: "Atoms/Image Uploader",
  component: ImageUploader,
};

export const Default = () => (
  <ImageUploader label="upload one or more jpegs" />
);

export const WithDefaultValue = () => (
  <ImageUploader defaultValue={data.defaultValue} label="re-order the below images, or upload one or more jpegs" />
);


const story = {
  parameters: {
    jest: ["components/atoms/image-uploader/image-uploader.test.jsx"]
  }
};
Default.story = story;
WithDefaultValue.story = story;