import React from 'react';
import { action } from '@storybook/addon-actions';
import { BannerImage } from 'atoms';

export default {
  title: 'BannerImage',
  component: BannerImage,
};

export const Text = () => <BannerImage
        backgroundPosition="center"
        cn={''}
        src={''}>
        <h2>Below is the list of items that you've collected.</h2>
      </BannerImage>