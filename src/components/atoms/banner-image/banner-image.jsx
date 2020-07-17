import React from 'react'
import PropTypes from 'prop-types'
import styles from './banner-image.module.scss'
import classNames from 'classnames'
import { isEmpty } from 'lodash'

const BannerImage = ({ backgroundPosition, children, cn, src }) => {
	const className = classNames({
		[styles.bannerImage]: true,
		[cn]: !isEmpty(cn)
	})
	return (
		<div className={className} style={{
			background: `url('${src}') no-repeat`,
			backgroundSize: 'cover',
			backgroundPosition
		}}>
			<div>{children}</div>
		</div>
	)
}
BannerImage.propTypes = {
	backgroundPosition: PropTypes.string,
}
BannerImage.defaultProps = {
	backgroundPosition: 'top'
}
export default BannerImage