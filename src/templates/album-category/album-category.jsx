import React from 'react'
import { SEO } from 'atoms'
import { CardCollection, Layout } from 'organisms'

const AlbumCategoryTemplate = ({ location, pageContext: { albumPosts, s3ObjectMap, taxonomies } }) => {
	return (
	  <Layout location={location}>
	  	<SEO title='Album Categories' keywords={taxonomies} />
	    <CardCollection
	      albumPosts={albumPosts}
	      location={location}
	      s3={s3ObjectMap}
	      taxonomies={taxonomies}
	    />
	  </Layout>
	)
}
export default AlbumCategoryTemplate