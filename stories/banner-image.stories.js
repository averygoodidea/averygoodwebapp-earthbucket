import { BannerImage } from "atoms";
import React from "react";
import { bannerImageData } from "test-data";
import "../src/components/organisms/layout/layout.scss";
import styles from "../src/templates/blog-post/blog-post.module.scss";

export default {
  title: "Banner Image",
  component: BannerImage
};

const { headerText, src } = bannerImageData;

export const BackgroundPositionTop = () => (
  <BannerImage backgroundPosition="top" cn={styles.bannerImage} src={src}>
    <h2>{headerText}</h2>
  </BannerImage>
);

export const BackgroundPositionCenter = () => (
  <BannerImage backgroundPosition="center" cn={styles.bannerImage} src={src}>
    <h2>{headerText}</h2>
  </BannerImage>
);

export const BackgroundPositionBottom = () => (
  <BannerImage backgroundPosition="bottom" cn={styles.bannerImage} src={src}>
    <h2>{headerText}</h2>
  </BannerImage>
);

const story = {
  parameters: {
    jest: ["components/atoms/banner-image/banner-image.test.jsx"]
  }
};
BackgroundPositionTop.story = story;
BackgroundPositionCenter.story = story;
BackgroundPositionBottom.story = story;
