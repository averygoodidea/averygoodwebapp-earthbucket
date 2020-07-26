import { BannerImage } from "atoms";
import { ContentWindow } from "molecules";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/molecules/content-window/data";

export default {
  title: "Molecules/Content Window",
  component: ContentWindow,
  parameters: {
    jest: ["components/molecules/content-window/content-window.test.jsx"]
  }
};

const { content, headerText, src } = data;

export const WithBannerImage = () => {
  const bannerImage = (
    <BannerImage src={src} backgroundPosition="center">
      <h2>{headerText}</h2>
    </BannerImage>
  );
  const html = (
    <div>
      <p>{content}</p>
    </div>
  );
  return <ContentWindow bannerImage={bannerImage}>{html}</ContentWindow>;
};
export const WithoutBannerImage = () => {
  const html = (
    <div>
      <h2>{headerText}</h2>
      <p>{content}</p>
    </div>
  );
  return <ContentWindow>{html}</ContentWindow>;
};
