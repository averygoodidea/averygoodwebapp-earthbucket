import React, { Component } from 'react'
import { SEO } from 'atoms'
import { CardCollection, Layout } from 'organisms'

const InventoryCategoryTemplate = ({ location, pageContext: { inventoryItems, s3ObjectMap, taxonomies } }) => {
	return (
	  <Layout location={location}>
	  	<SEO title='Item Categories' keywords={taxonomies} />
	    <CardCollection
	      inventoryItems={inventoryItems}
	      location={location}
	      s3={s3ObjectMap}
	      taxonomies={taxonomies}
	    />
	  </Layout>
	)
}
export default InventoryCategoryTemplate