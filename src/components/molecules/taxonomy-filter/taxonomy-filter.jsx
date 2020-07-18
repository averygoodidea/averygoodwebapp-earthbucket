import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'atoms'
import styles from './taxonomy-filter.module.scss'
import { graphql, navigate } from 'gatsby'
import classNames from 'classnames'

const TaxonomyFilter = ({ baseRoute, defaultScrollLeftPropName, fontIcon, taxonomies, indexRoute, location }) => {
	const currentView = location.pathname
	const taxonomyFilterRef = useRef(null)
	const navItems = taxonomies.sort().map( (taxonomy, i) => {
		const additionalProps = {}
		if(baseRoute === '/album/category/') {
			additionalProps.fontIcon = `category-${taxonomy}`
		}
		return (
			<li key={i}>
				<Button
					label={taxonomy}
					cn={currentView !== indexRoute && currentView.split(baseRoute)[1].split('/')[0] === taxonomy ? styles.tabbed : ''}
					onClick={ e => {
						e.preventDefault()
						requestAnimationFrame(() => {
							const state = {}
							state[defaultScrollLeftPropName] = taxonomyFilterRef.current.scrollLeft
							navigate(`${baseRoute}${taxonomy}/`, { state: { ...state } })
						})
					}}
					{...additionalProps}
				/>
			</li>
		)
	})
	if (location.state && location.state[defaultScrollLeftPropName]) {
		requestAnimationFrame(() => {
			document.querySelector('[class*=taxonomyFilter]').scrollTo(location.state[defaultScrollLeftPropName], 0)
		})
	}
	const className = classNames({
		[styles.tabbed]: currentView === indexRoute,
		[styles.indexButton]: true
	})
	return (
		<nav>
			<ul className={styles.taxonomyFilter} ref={taxonomyFilterRef}>
				<li><Button
					fontIcon={fontIcon}
					label=""
					cn={className}
					onClick={ e => {
						e.preventDefault()
						requestAnimationFrame(() => {
							const state = {}
							state[defaultScrollLeftPropName] = taxonomyFilterRef.current.scrollLeft
							navigate(indexRoute, { state: { ...state } })
						})
					}}
				/></li>
				{navItems}
			</ul>
		</nav>
	)
}
TaxonomyFilter.propTypes = {
	baseRoute: PropTypes.string,
	defaultScrollLeftPropName: PropTypes.string,
	fontIcon: PropTypes.string,
	taxonomies: PropTypes.array,
	indexRoute: PropTypes.string,
	location: PropTypes.object
}
TaxonomyFilter.defaultProps = {
	baseRoute: '/blog/tag/',
	defaultScrollLeftPropName: 'defaultTagFilterScrollLeft',
	fontIcon: 'typewriter',
	taxonomies: [],
	indexRoute: '/blog/',
	location: { pathname: '' }
}
export default TaxonomyFilter