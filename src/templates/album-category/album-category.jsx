import { SEO } from "atoms";
import { CardCollection, Layout } from "organisms";
import React from "react";

const AlbumCategoryTemplate = ({
  location,
  pageContext: { albumPosts, s3ObjectMap, taxonomies }
}) => {
  return (
    <Layout location={location}>
      <SEO title="Feature Categories" keywords={taxonomies} />
      <CardCollection
        albumPosts={albumPosts}
        location={location}
        s3={s3ObjectMap}
        taxonomies={taxonomies}
      />
    </Layout>
  );
};
export default AlbumCategoryTemplate;
