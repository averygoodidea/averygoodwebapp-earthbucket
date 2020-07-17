import React from 'react'
import { Link } from 'gatsby'
import styles from './logo.module.scss'

const Logo = () => (
	<Link to="/" className={styles.logo}>
      <i className="font-icon-school-backpack"></i>
    </Link>
)
export default Logo