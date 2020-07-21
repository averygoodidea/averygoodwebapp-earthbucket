import React from 'react'
import PropTypes from 'prop-types'
import styles from './share-button.module.scss'

const ShareButton = ({ onClick, onKeyPress }) => (
	<button
		className={styles.shareButton}
		onClick={onClick}
		onKeyPress={onKeyPress}>
		<i className="font-icon-share" />
	</button>
)
ShareButton.propTypes = {
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func
}
ShareButton.defaultProps = {
  onClick: () => {},
  onKeyPress: () => {}
}
export default ShareButton