import React, { Component } from 'react'
import { Button, Toast } from 'atoms'
import styles from './author-site-settings-manager.module.scss'
import ReactLoading from 'react-loading'
import { isEmpty } from 'lodash'
import { AVeryGoodAuthenticator } from 'assets-js'
import toastedNotes from 'toasted-notes'

const TOAST_DURATION = 10000 // 10 seconds
class AuthorSiteSettingsManager extends Component {
	constructor(props) {
		super(props)
		this.state = {
			LOADING_STATE: 'unloaded'
		}
	}
	deploySiteChanges() {
		this.setState( { LOADING_STATE: 'loading' }, () => {
			let closeNotification
			toastedNotes.notify(({ onClose }) => {
				closeNotification = onClose
				return <Toast message="Deploying Site Changes..." loadingState="loading" />
			}, {
				duration: null
			})
			const { getStorage } = AVeryGoodAuthenticator.utils
			const headers = {
				'Content-Type': 'application/json',
				'Authorization': getStorage('authorizationHash'),
				'x-api-key': process.env.GATSBY_WATERAPI_KEY
			}
			fetch(`/api/1/admin/cloudfront-cache`, {
				method: 'DELETE',
				headers
			}).then( response => {
				// if access is unauthorized
					// sign out
				if(response.status === 401) {
					AVeryGoodAuthenticator.signOut()
				}
			}).then( () => {
				this.setState({ LOADING_STATE: 'loaded' }, () => {
					closeNotification()
					let message = "<p>Your site changes are being deployed 🚀.</p>"
					message += `<p>Give it a little time, then visit your updated pages at <a href="https://${process.env.GATSBY_EARTHBUCKET_HOSTNAME}" target="_blank">${process.env.GATSBY_EARTHBUCKET_HOSTNAME}</a>.</p>`
					message += "<p>If you don't see your changes, be sure to refresh your browser.</p>"
					toastedNotes.notify(<Toast htmlMessage={message} fontIcon="synchronize" fullWidth={true} />, { duration: TOAST_DURATION })
					const delayFormResetToPreventTooManySubmissions = setTimeout(() => {
						this.setState({ LOADING_STATE: 'unloaded' })
						clearTimeout(delayFormResetToPreventTooManySubmissions)
					}, TOAST_DURATION)
				})
			})
		})
	}
	render() {
		const { LOADING_STATE } = this.state
		return (
			<div className={styles.window}>
				<div className={styles.info}>
					<div className={styles.content}>
						<h2>Manage Site Settings</h2>
						<Button
							label="Deploy Site Changes"
							theme="red"
							fontIcon="synchronize"
							onClick={ e => {
								const isConfirmed = confirm('Are you sure you want to deploy your site changes?')
								if (isConfirmed) {
									this.deploySiteChanges()
								}
							}}
							isDisabled={LOADING_STATE !== 'unloaded'}
						/>
					</div>
				</div>
			</div>
		)
	}
}
export default AuthorSiteSettingsManager