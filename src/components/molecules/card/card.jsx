import React from 'react'
import { graphql, Link, navigate } from 'gatsby'
import styles from './card.module.scss'

const Card = ({ categories, history, image, inventoryItems, price, slugId, title }) => (
	<Link
		className={styles.card}
		to={`/i/${slugId}/`}
		state={{
			inventoryItems,
			previousPathname: history.pathname,
			previousScrollY: history.scrollY,
			previousAmountToShow: history.amountToShow,
			defaultCategoryFilterScrollLeft: history.defaultCategoryFilterScrollLeft
		}}>
		<img src={image.childImageSharp.fluid.src} alt={title} />
		<p className={styles.title}>{title}</p>
		<div className={styles.additionalInfo}>
			<div>{categories.map( (category, i) => (
					<div
						key={i}
						onClick={e => {
							e.preventDefault()
							navigate(`/i/category/${category}/`)
						}}
						className={styles.iconButton}
					>
						<i className={`font-icon-category-${category}`} />
					</div>
				)
			)}</div>
			<p>{`$${price}`}</p>
		</div>
	</Link>
)
export default Card