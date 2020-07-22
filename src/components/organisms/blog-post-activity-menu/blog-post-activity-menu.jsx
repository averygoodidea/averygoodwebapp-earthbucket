import React, { Component } from 'react'
import { navigate } from 'gatsby'
import PropTypes from 'prop-types'
import { Button, ShareButton } from 'atoms'
import { ShareMenu } from 'molecules'
import styles from './blog-post-activity-menu.module.scss'
import moment from 'moment'

class BlogPostActivityMenu extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isShareMenuOpen: false
		}
	}
	onShareButtonClick() {
		const { isShareMenuOpen } = this.state
		this.setState({ isShareMenuOpen: !isShareMenuOpen })
	}
	render() {
		const { author, date, tags } = this.props
		const { isShareMenuOpen } = this.state
		return (
			<div className={styles.activityMenu}>
				<div className={styles.moreInfo}>
					<p><em>by {author}<br />published on {moment(date).format('MMMM Do YYYY, h:mma')} in</em></p>
					<div className={styles.tags}>{tags.map( (tag, i) => (
							<Button
								key={i}
								label={tag}
								onClick={e => {
									e.preventDefault()
									navigate(`/blog/tag/${tag}`)
								}}
								className={styles.iconButton}
								isIconDisabled={true}
							/>
						)
					)}</div>
				</div>
				<div className={styles.shareButton}>
					<ShareButton
						onClick={ e => {
							e.preventDefault()
							this.onShareButtonClick()
						}}
					/>
					{isShareMenuOpen && <ShareMenu url={document.location} tags={tags} />}
				</div>
			</div>
		)
	}
}
BlogPostActivityMenu.propTypes = {
	'author': PropTypes.string,
	'categories': PropTypes.array,
	'date': PropTypes.string
}
BlogPostActivityMenu.defaultProps = {
	'author': '',
	'categories': [],
	'date': ''
}
export default BlogPostActivityMenu