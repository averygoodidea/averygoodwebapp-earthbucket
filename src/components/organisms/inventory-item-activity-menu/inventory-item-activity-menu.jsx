import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, DislikeButton, LikeButton, ShareButton, Toast } from 'atoms'
import { ShareMenu } from 'molecules'
import styles from './inventory-item-activity-menu.module.scss'
import toastedNotes from 'toasted-notes'
import { isEmpty } from 'lodash'
import { LocalStorageList } from 'assets-js'
import moment from 'moment'

const TOAST_DURATION = 1000 // 1 second
class InventoryItemActivityMenu extends Component {
	constructor(props) {
		super(props)
		this.state = {
			hasBeenCollected: false,
			isShareMenuOpen: false
		}
	}
	componentDidMount() {
		const { alternative_id } = this.props.item
		const postIds = LocalStorageList.getPostIds()
		if (!isEmpty(postIds)) {
			this.setState({ hasBeenCollected: postIds.includes(alternative_id) })
		} else {
			window.localStorage.setItem('postIds', '')
		}
	}
	addToList() {
		const { item: { alternative_id, title }, onInventoryItemEvent } = this.props
		const itemIds = LocalStorageList.getPostIds().filter( postId => !isEmpty(postId))
		if (!itemIds.includes(alternative_id)) {
			LocalStorageList.addPostId(alternative_id)
			this.setState( { hasBeenCollected: true }, () => {
				toastedNotes.notify(<Toast htmlMessage={`<p><strong>Added</strong> <em>${title}</em> to Your List</p>`} fontIcon="like" to={'/album/list/'} />, { duration: TOAST_DURATION })
				onInventoryItemEvent({
					type: 'LIKED',
					createdAt: moment().unix()
				})
			})
		}
	}
	removeFromList() {
		const { item: { alternative_id, title }, onInventoryItemEvent } = this.props
		const itemIds = LocalStorageList.getPostIds().filter( postId => !isEmpty(postId))
		if (itemIds.includes(alternative_id)) {
			LocalStorageList.removePostId(alternative_id)
			this.setState( { hasBeenCollected: false }, () => {
				toastedNotes.notify(<Toast htmlMessage={`<p><strong>Removed</strong> <em>${title}</em> from Your List</p>`} fontIcon="dislike" to={'/album/list/'} />, { duration: TOAST_DURATION })
				onInventoryItemEvent({
					type: 'DISLIKED',
					createdAt: moment().unix()
				})
			})
		}
	}
	openMoreInfoUrl() {
		const { moreInfoUrl } = this.props
		window.open(moreInfoUrl, '_blank')
	}
	onShareButtonClick() {
		const { isShareMenuOpen } = this.state
		requestAnimationFrame(() => {
			this.setState({ isShareMenuOpen: !isShareMenuOpen })
		})
	}
	render() {
		const { hasBeenCollected, isShareMenuOpen } = this.state
		return (
			<div className={styles.activityMenu}>
				<div className={styles.plusButton}>
					{!hasBeenCollected && <LikeButton
						onClick={ e => {
							e.preventDefault()
							this.addToList()
						}}
					/>}
					{hasBeenCollected && <DislikeButton
						onClick={ e => {
							e.preventDefault()
							this.removeFromList()
						}}
					/>}
				</div>
				<div className={styles.shareButton}>
					<ShareButton
						onClick={ e => {
							e.preventDefault()
							this.onShareButtonClick()
						}}
					/>
					{isShareMenuOpen && <ShareMenu url={document.location} cn={styles.shareMenu} />}
				</div>
				<div className={styles.shopButton}>
					<Button
						label="Shop Item"
						fontIcon='price-tag'
						theme='red'
						onClick={ e => {
							this.openMoreInfoUrl()
						}}
						onKeyPress={ e => {
							if (e.keyCode === 13) {
								this.openMoreInfoUrl()
							}
						}}
					/>
				</div>
			</div>
		)
	}
}
InventoryItemActivityMenu.propTypes = {
	moreInfoUrl: PropTypes.string,
  	onClick: PropTypes.func,
  	onKeyPress: PropTypes.func,
  	onDisliked: PropTypes.func,
  	onLiked: PropTypes.func
}
InventoryItemActivityMenu.defaultProps = {
  	onClick: () => {},
  	onKeyPress: () => {},
  	onInventoryItemEvent: () => {}
}
export default InventoryItemActivityMenu