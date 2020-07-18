import React, { Component } from 'react'
import { SEO } from 'atoms'
import { CardCollection, Layout } from 'organisms'

const InventoryCategoryTemplate = ({ location, pageContext: { albumPosts, s3ObjectMap, taxonomies } }) => {
	return (
	  <Layout location={location}>
	  	<SEO title='Item Categories' keywords={taxonomies} />
	    <CardCollection
	      inventoryItems={albumPosts}
	      location={location}
	      s3={s3ObjectMap}
	      taxonomies={taxonomies}
	    />
	  </Layout>
	)
}
export default InventoryCategoryTemplate