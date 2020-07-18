import React from 'react'
import PropTypes from 'prop-types'
import { Link, navigate } from 'gatsby'
import { Button } from 'atoms' 
import styles from './main-nav.module.scss'
import classNames from 'classnames'

const MainNav = ({ currentView }) => {
	const items = [{
		fontIcon: 'inventory-items',
		target: '/',
		title: 'Album',
	},{
		fontIcon: 'typewriter',
		target: '/blog/',
		title: 'Blog',
	},{
		fontIcon: 'info',
		target: '/about/',
		title: 'About',
	}]
	return	(
		<nav className={styles.mainNav}>
			{items.map( ({ fontIcon, target, title, }, i) => {
				let shouldTabButton
				if (currentView === target) {
					shouldTabButton = true
				} else if (target === '/' && (currentView.includes('/album/') || currentView.includes('/category/') ||  currentView.includes('/album/list/'))) {
					shouldTabButton = true
				} else if (target === '/blog/' && currentView.includes('/blog/')) {
					shouldTabButton = true
				}
				const tabbedButtonClassName = classNames({
					[styles.tabbed]: shouldTabButton
				})
				return (
					<Button
						cn={tabbedButtonClassName}
						key={i}
						fontIcon={fontIcon}
						label={title}
						onClick={ e => {
							navigate(target)
						}}
						/>
				)
			})}
	    </nav>
	)
}
MainNav.propTypes = {
	currentView: PropTypes.string
}
MainNav.defaultProps = {
	currentView: ''
}
export default MainNav