import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types"
import { Button, PlusButton } from 'atoms'
import styles from './author-inventory-menu.module.scss'
import classNames from 'classnames'

const sortByDate = (a, b) => {
	let result = 0
	if (a.createdAt < b.createdAt) {
		result = 1
	} else if (a.createdAt > b.createdAt) {
		result = -1
	}
	return result
}
const sortAlphabetically = (a, b) => {
	let result = 0
	const aTitle = a.title.toLowerCase()
	const bTitle = b.title.toLowerCase()
	if (aTitle > bTitle) {
		result = 1
	} else if (aTitle < bTitle) {
		result = -1
	}
	return result
}
const AuthorInventoryMenu = ({ items, onPlusButtonClick, selectedItem }) => {
	const [inventoryItems, setInventoryItems] = useState(items)
	const [sortedBy, setSortedBy] = useState('most-recent')
	return (
		<div className={styles.authorInventoryMenu}>
			<div className={styles.plusButton}>
				<PlusButton onClick={ e => onPlusButtonClick() } />
			</div>
			<div className={styles.sortBy}>
				<Button
					cn={sortedBy === 'most-recent' ? styles.tabbed : ''}
					isIconDisabled={true}
					label='Sort by Most Recent'
					onClick={() => {
						//sorted by date, reverse chronological
						setInventoryItems([].concat(inventoryItems.sort(sortByDate)))
						setSortedBy('most-recent')
					}}
				/>
				<Button
					cn={sortedBy === 'alphabetically' ? styles.tabbed : ''}
					isIconDisabled={true}
					label='Sort by Title'
					onClick={() => {
						setInventoryItems([].concat(inventoryItems.sort(sortAlphabetically)))
						setSortedBy('alphabetically')
					}}
				/>
			</div>
			<ul>
				{inventoryItems.map( (item, i) => {
					const className = classNames({
						[styles.tabbed]: selectedItem.id === item.id
					})
					return (
						<li key={i} className={className}>
							<div className={styles.ordinal}>{i+1}</div>
							<Button
								isIconDisabled={true}
								key={i}
								label={item.title}
								onClick={ e => item.onClick(item) }
							/>
						</li>
					)
			})}
			</ul>
		</div>
	)
}
AuthorInventoryMenu.propTypes = {
  items: PropTypes.array,
  onPlusButtonClick: PropTypes.func,
  selectedItem: PropTypes.object
}

AuthorInventoryMenu.defaultProps = {
  items: [],
  onPlusButtonClick: () => {},
  selectedItem: {}
}
export default AuthorInventoryMenu