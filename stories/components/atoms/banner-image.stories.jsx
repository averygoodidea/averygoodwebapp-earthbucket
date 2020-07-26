import { BannerImage } from "atoms";
import React from "react";
import data from "components/atoms/banner-image/data";
import styles from "components/molecules/content-window/content-window.module.scss";

export default {
  title: "Atoms/Banner Image",
  component: BannerImage,
  parameters: {
    jest: ["components/atoms/banner-image/banner-image.test.jsx"]
  }
};

const { headerText, src } = data;

export const BackgroundPositionTop = () => (
  <BannerImage backgroundPosition="top" src={src}>
    <h2>{headerText}</h2>
  </BannerImage>
);

export const BackgroundPositionCenter = () => (
  <BannerImage backgroundPosition="center" src={src}>
    <h2>{headerText}</h2>
  </BannerImage>
);

export const BackgroundPositionBottom = () => (
  <BannerImage backgroundPosition="bottom" src={src}>
    <h2>{headerText}</h2>
  </BannerImage>
);

export const RemoveBottomRoundedCornersForContentWindow = () => (
  <BannerImage backgroundPosition="bottom" cn={styles.bannerImage} src={src}>
    <h2>{headerText}</h2>
  </BannerImage>
);
