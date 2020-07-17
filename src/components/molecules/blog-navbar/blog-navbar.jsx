import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { Button } from 'atoms'
import styles from './blog-navbar.module.scss'

const BlogNavbar = ({ next, previous }) => {
	return (
		<div className={styles.navbar}>
			{previous !== null ? <Button
				cn={styles.previous}
				fontIcon="previous"
				label={previous.title}
				onClick={ () => navigate(`/blog/${previous.slug}/`) }
			/> : <div className={styles.disabled} /> }
			<Button
				cn={styles.blogIndexButton}
				fontIcon="typewriter"
				label="Blog Index"
				onClick={ () => navigate('/blog/') }
			/>
			{next !== null ? <Button
				align="right"
				cn={styles.next}
				fontIcon="next"
				label={next.title}
				onClick={ () => navigate(`/blog/${next.slug}/`) }
			/> : <div className={styles.disabled} /> }
		</div>
	)
}
BlogNavbar.propTypes = {
	next: PropTypes.object,
	previous: PropTypes.object
}
BlogNavbar.defaultProps = {
	next: {},
	previous: {}
}
export default BlogNavbar