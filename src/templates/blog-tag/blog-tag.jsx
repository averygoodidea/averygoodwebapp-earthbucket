import { SEO } from 'atoms'
import { ExcerptCollection, Layout } from 'organisms'
import React, { useEffect } from 'react'

const BlogTagTemplate = ({ location, pageContext: { allPostExcerpts, s3ObjectMap, taxonomies } }) => {
    // reach router doesn't trigger a browser refresh, therefore the scrollTo Y position never resets
    // therefore, manualy reset scroll position on blog index render
    useEffect(() => {
      window.scrollTo(0,0)
    }, [])
    return (
    <Layout location={location} sectionTitle="Blog">
      <SEO title='Blog Tags' keywords={taxonomies} />
      <ExcerptCollection
        location={location}
        postExcerpts={allPostExcerpts}
        pathname={location.pathname}
        s3={s3ObjectMap}
        taxonomies={taxonomies}
      />
    </Layout>
  )
}
export default BlogTagTemplate