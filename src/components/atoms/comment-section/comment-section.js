import React from 'react'
import PropTypes from 'prop-types'
import Valine from 'gatsby-plugin-valine'
import './comment-section.scss'
import classNames from 'classnames'

const CommentSection = ({ isModal, mode }) => {
	const className = classNames({
		["commentSection"]: true,
		["fullWidth"]: mode === 'fullWidth',
		["brighten"]: mode === 'compact' && !isModal
	})
	return (
		<div className={className}>
			{typeof window !== `undefined` && <Valine path={window.location.pathname} />}
		</div>
	)
}

CommentSection.propTypes = {
	mode: PropTypes.string,
	isModal: PropTypes.bool
}
CommentSection.defaultProps = {
	isModal: false,
	mode: 'compact' // compact|fullWidth
}

export default CommentSection