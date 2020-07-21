import React from 'react'
import PropTypes from 'prop-types'
import styles from './plus-button.module.scss'

const PlusButton = ({ onClick, onKeyPress }) => (
	<button
		className={styles.plusButton}
		onClick={onClick}
		onKeyPress={onKeyPress}>
		<i className="font-icon-plus" />
	</button>
)
PlusButton.propTypes = {
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func
}
PlusButton.defaultProps = {
  onClick: () => {},
  onKeyPress: () => {}
}
export default PlusButton