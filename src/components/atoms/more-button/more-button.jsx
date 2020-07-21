import React from 'react'
import PropTypes from 'prop-types'
import styles from './more-button.module.scss'

const MoreButton = ({ onClick, onKeyPress }) => (
	<button
		className={styles.moreButton}
		onClick={onClick}
		onKeyPress={onKeyPress}>
		<i className="font-icon-ellipsis" />
	</button>
)
MoreButton.propTypes = {
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func
}
MoreButton.defaultProps = {
  onClick: () => {},
  onKeyPress: () => {}
}
export default MoreButton