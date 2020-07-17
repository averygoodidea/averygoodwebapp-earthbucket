import React from 'react'
import PropTypes from 'prop-types'
import styles from './textfield.module.scss'
import { isEmpty } from 'lodash'
import classNames from 'classnames'

const Textfield = ({ label, name, onChange, onClick, onKeyPress, showLabel, type, placeholder, isDisabled, defaultValue }) => {

	const props = {}
	if (!isEmpty(name)) {
		props.name = name
	}

	const labelClassName = classNames({
		[styles.label]: true,
		[styles.hidden]: !showLabel
	})

	return (
		<label>
			<div className={labelClassName}>{label}</div>
			<input
				className={styles.textfield}
				type={type}
				placeholder={placeholder}
				onClick={onClick}
				onKeyPress={onKeyPress}
				onChange={onChange}
				disabled={isDisabled ? "disabled" : false}
				defaultValue={defaultValue}
				{...props}
			/>
		</label>
	)
}
Textfield.propTypes = {
	showLabel: PropTypes.bool,
	label: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	onClick: PropTypes.func,
	onKeyPress: PropTypes.func,
	isDisabled: PropTypes.bool
}
Textfield.defaultProps = {
	showLabel: true,
	label: "add label",
	name: "",
	type: "text",
	placeholder: "add placeholder",
	onChange: () => {},
	onClick: () => {},
	onKeyPress: () => {},
	isDisabled: false
}
export default Textfield