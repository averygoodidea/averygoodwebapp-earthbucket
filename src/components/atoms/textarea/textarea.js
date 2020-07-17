import React from 'react'
import PropTypes from 'prop-types'
import styles from './textarea.module.scss'

const Textarea = ({ label, onChange, placeholder, isDisabled, defaultValue }) => (
	<label>
		<div className={styles.label}>{label}</div>
		<textarea
			className={styles.textarea}
			placeholder={placeholder}
			onChange={onChange}
			disabled={isDisabled ? "disabled" : false}
			defaultValue={defaultValue}
		/>
	</label>
)
Textarea.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	isDisabled: PropTypes.bool,
	defaultValue: PropTypes.string
}
Textarea.defaultProps = {
	label: "add label",
	placeholder: "add placeholder",
	onChange: () => {},
	isDisabled: false
}
export default Textarea