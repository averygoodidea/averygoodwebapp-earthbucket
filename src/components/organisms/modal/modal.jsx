import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { findIndex } from 'lodash'
import mousetrap from 'mousetrap'
import Typography from 'typography'
import { navigate, StaticQuery, graphql } from 'gatsby'
import styles from './modal.module.scss'
import './modal.scss'

Modal.setAppElement(`#___gatsby`)

const { rhythm } = new Typography()

class InventoryItemModal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			enableNav: false
		}
	}
	componentDidMount() {
		const { location } = this.props
		const enableNav = location.state && location.state.inventoryItems && location.state.inventoryItems.length > 1
		if (enableNav) {
			mousetrap.bind(`left`, () => this.previous())
			mousetrap.bind(`right`, () => this.next())
			mousetrap.bind(`space`, () => this.next())
		}
		this.setState( { enableNav })

		const comments = document.querySelector('.comments')
	}
	componentWillUnmount() {
		const { enableNav } = this.state
		if (enableNav) {
			mousetrap.unbind(`left`)
			mousetrap.unbind(`right`)
			mousetrap.unbind(`space`)
		}
	}
	findCurrentIndex() {
		const { inventoryItems } = this.props.location.state
		const index = findIndex( inventoryItems, ({ node }) => this.props.location.pathname.includes(node.slugId) )
		return index
	}
	next(e) {
		const { inventoryItems } = this.props.location.state
		if (e) {
			e.stopPropagation()
		}
		const currentIndex = this.findCurrentIndex()
		if (currentIndex || currentIndex === 0) {
			let inventoryItem
			// wrap around if at end
			if (currentIndex + 1 === inventoryItems.length) {
				inventoryItem = inventoryItems[0]
			} else {
				inventoryItem = inventoryItems[currentIndex + 1]
			}
			navigate(`/album/${inventoryItem.node.slugId}/`, { state: { ...this.props.location.state } })
		}
	}
	previous(e) {
		const { inventoryItems } = this.props.location.state
		if (e) {
			e.stopPropagation()
		}
			const currentIndex = this.findCurrentIndex()
		if (currentIndex || currentIndex === 0) {
			let inventoryItem
			// wrap around if at start
			if (currentIndex === 0) {
				inventoryItem = inventoryItems.slice(-1)[0]
			} else {
				inventoryItem = inventoryItems[currentIndex - 1]
			}
			navigate(`/album/${inventoryItem.node.slugId}/`, { state: { ...this.props.location.state } })
		}
	}
	closeModal() {
		const { defaultCategoryFilterScrollLeft, previousAmountToShow, previousPathname, previousScrollY } = this.props.location.state
		navigate(previousPathname, { state: {
			defaultAmountToShow: previousAmountToShow,
			defaultCategoryFilterScrollLeft,
			defaultScrollY: previousScrollY
		} })
	}
	render() {
		const { isOpen, children } = this.props
		const { enableNav } = this.state
		return (
			<Modal
				isOpen={isOpen}
				onRequestClose={ () => this.closeModal()}
				contentLabel="Modal"
				style={{
					zIndex: 10,
	                overlay: {
	                  position: `fixed`,
	                  top: 0,
	                  left: 0,
	                  right: 0,
	                  bottom: 0,
	                  backgroundColor: `rgba(0, 0, 0, 0.75)`
	                },
	                content: {
	                  position: `absolute`,
	                  border: `none`,
	                  background: `none`,
	                  padding: 0,
	                  top: 0,
	                  bottom: 0,
	                  right: 0,
	                  left: 0,
	                  overflow: `auto`,
	                  WebkitOverflowScrolling: `touch`,
	                },
	              }}>
					<div
						className={styles.overlayCloseButton}
						css={{ maxWidth: rhythm(40.25) }}>
						<div className={styles.content}>
							{enableNav && <div
								className={styles.previousButton}
								onClick={e => this.previous(e)}
								onKeyPress={ e => false /* handled by moustrap */ }
								role="button"
								tabIndex="0">
								<i className="font-icon-previous" />
							</div>}
							{children}
							{enableNav && <div
								className={styles.nextButton}
								onClick={e => this.next(e)}
								onKeyPress={ e => false /* handled by moustrap */ }
								role="button"
								tabIndex="0">
								<i className="font-icon-next" />
							</div>}
							<div
								className={styles.closeButton}
								onClick={() => this.closeModal()}
								onKeyPress={ e => {
									if (e.key === 'Enter') {
										this.closeModal()
									}
								}}
								role="button"
								tabIndex="0">
								<i className="font-icon-close" />
							</div>
						</div>
					</div>
			</Modal>
		)
	}
}
InventoryItemModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired
}
InventoryItemModal.defaultProps = {
  isOpen: true,
  location: {}
}
export default InventoryItemModal