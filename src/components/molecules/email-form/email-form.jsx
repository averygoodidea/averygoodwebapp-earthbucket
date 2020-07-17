import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Textfield, SubmitButton } from 'atoms'
import styles from './email-form.module.scss'
import classNames from 'classnames'
import AveryGoodAuthenticator from '../../../assets/js/averygoodauthenticator'
import { isEmpty } from 'lodash'

class EmailForm extends Component {
	constructor() {
		super()
		this.state = {
			email: '',
			emailInputPlaceholder: 'email@domain.com',
			helpMessage: '',
			isEmailInputDisabled: false,
			isSubmitButtonDisabled: true,
			LOADING_STATE: 'unloaded'
		}
	}
	onChange(email) {
		const { utils } = AveryGoodAuthenticator
		if(utils.isValidEmailFormat(email)) {
			this.setState({
				email,
				isSubmitButtonDisabled: false,
				helpMessage: ''
			})
		} else {
			const { emailInputPlaceholder } = this.state
			this.setState({
				isSubmitButtonDisabled: true,
				helpMessage: `<p>Please type a valid email address ( <strong>${emailInputPlaceholder}</strong> )</p>`
			})
		}
	}
	render() {
		const {
			emailInputPlaceholder,
			helpMessage,
			isEmailInputDisabled,
			isSubmitButtonDisabled,
			LOADING_STATE
		} = this.state
		const { isModal, mode } = this.props
		const className = classNames({
			[styles.emailForm]: true,
			[styles.brighten]: !isModal && typeof window !== `undefined` && window.location.pathname.includes('/i/')
		})
		return (
			<div className={className}>
				<div className={styles.message}>
					<p>Join <strong><em>Personal Inventory</em></strong>, my email list to stay in touch as we walk out our life's journey together.
					<br /><span className={styles.signature}><i className="font-icon-avery-signature" /></span></p>
				</div>
				<form
					_lpchecked="1"
					action="https://tinyletter.com/faithinventory"
					className={styles.form}
					method="post"
					target="popupwindow">
					<Textfield
						label="submit email for newsletter"
						name="email"
						type="text"
						placeholder={emailInputPlaceholder}
						onChange={ e => {
							this.onChange(e.target.value)
						}}
						isDisabled={isEmailInputDisabled}
						showLabel={false}
					/>
					<input id="email" type="hidden" value="1" name="embed" />
					<SubmitButton
						value="Submit"
						theme="default"
						isDisabled={isSubmitButtonDisabled}
					/>
					<div className={styles.buttonBackground} />
					{!isEmpty(helpMessage) && <div
						className={styles.helpMessage}
						dangerouslySetInnerHTML={{
							__html: helpMessage
						}}
					/>}
				</form>
			</div>
		)
	}
}
EmailForm.propTypes = {
	isModal: PropTypes.bool
}
EmailForm.defaultProps = {
	isModal: false
}
export default EmailForm