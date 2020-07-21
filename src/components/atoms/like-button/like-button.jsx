import React from 'react'
import PropTypes from 'prop-types'
import styles from './like-button.module.scss'

const LikeButton = ({ onClick, onKeyPress }) => (
	<button
		className={styles.likeButton}
		onClick={onClick}
		onKeyPress={onKeyPress}>
		<i className="font-icon-like" />
	</button>
)
LikeButton.propTypes = {
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func
}
LikeButton.defaultProps = {
  onClick: () => {},
  onKeyPress: () => {}
}
export default LikeButton