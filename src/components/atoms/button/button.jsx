import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './button.module.scss'
import { isEmpty } from 'lodash'

const Button = ({ align, label, fontIcon, theme, onClick, onKeyPress, cn, isDisabled, isIconDisabled }) => {
	const className = classNames({
		[styles.button]: true,
		[styles[theme]]: true,
		[cn]: !isEmpty(cn)
	})
	return (
		<button
			className={className}
			onClick={onClick}
			onKeyPress={onKeyPress}
			disabled={isDisabled ? "disabled" : false}>
			{align === 'left' && !isIconDisabled && <Fragment>
				<i className={`font-icon-${fontIcon || label}`} /><span>{label}</span>
			</Fragment>}
			{align === 'right' && !isIconDisabled && <Fragment>
				<div className={styles.rightAligned}><span>{label}</span><i className={`font-icon-${fontIcon || label}`} /></div>
			</Fragment>}
			{isIconDisabled && <Fragment>{label}</Fragment>}
		</button>
	)
}
Button.propTypes = {
	align: PropTypes.string,
	label: PropTypes.string,
	theme: PropTypes.string,
	onClick: PropTypes.func,
	onKeyPress: PropTypes.func,
	additionalClassName: PropTypes.string,
	isDisabled: PropTypes.bool,
	isIconDisabled: PropTypes.bool
}
Button.defaultProps = {
	align: 'left',
	label: 'My Button',
	theme: 'default',
	onClick: () => {},
	onKeyPress: () => {},
	additionalClassName: '',
	isDisabled: false,
	isIconDisabled: false
}
export default Button