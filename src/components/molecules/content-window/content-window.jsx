import React from 'react'
import PropTypes from 'prop-types'
import styles from './content-window.module.scss'

const ContentWindow = ({ bannerImage, children }) => {
	return (
		<div className={styles.window}>
			{bannerImage}
			<div className={styles.info}>
				<div className={styles.content}>{children}</div>
			</div>
		</div>
	)
}
export default ContentWindow