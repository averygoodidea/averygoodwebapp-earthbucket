import React from 'react'
import PropTypes from 'prop-types'
import styles from './dislike-button.module.scss'

const DislikeButton = ({ onClick, onKeyPress }) => (
	<button
		className={styles.dislikeButton}
		onClick={onClick}
		onKeyPress={onKeyPress}
	>
		<i className="font-icon-dislike" />
	</button>
)
DislikeButton.propTypes = {
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func
}
DislikeButton.defaultProps = {
  onClick: () => {},
  onKeyPress: () => {}
}
export default DislikeButton