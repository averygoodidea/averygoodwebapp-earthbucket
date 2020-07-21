import React from 'react'
import PropTypes from "prop-types"
import { Button } from 'atoms'
import styles from './author-navbar.module.scss'

const AuthorNavbar = ({ items, currentView }) => (
	<nav className={styles.authorNavbar}>
		{items.map( (item, i) => <Button
			key={i}
			label={item.title}
			fontIcon={item.fontIcon}
			cn={currentView.includes(item.targetView) ? styles.tabbed : ''}
			onClick={ e => item.onClick(item) }
		/>)}
	</nav>
)
AuthorNavbar.propTypes = {
  items: PropTypes.array
}

AuthorNavbar.defaultProps = {
  items: []
}
export default AuthorNavbar