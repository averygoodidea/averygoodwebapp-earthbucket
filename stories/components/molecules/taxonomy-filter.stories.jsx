import { TaxonomyFilter } from "molecules";
import React from "react";
import { action } from "@storybook/addon-actions";
import data from "components/molecules/taxonomy-filter/data";

export default {
  title: "Molecules/Taxonomy Filter",
  component: TaxonomyFilter,
  parameters: {
    jest: ["components/molecules/taxonomy-filter/taxonomy-filter.test.jsx"]
  }
};

export const AlbumCategories = () => {
  const { baseRoute, fontIcon, indexRoute, location, taxonomies } = data.album;
  return (
    <TaxonomyFilter
      baseRoute={baseRoute}
      indexRoute={indexRoute}
      location={location}
      fontIcon={fontIcon}
      taxonomies={taxonomies}
    />
  );
};
export const BlogTags = () => {
  const { baseRoute, location, taxonomies } = data.blog;
  return <TaxonomyFilter location={location} taxonomies={taxonomies} />;
};
