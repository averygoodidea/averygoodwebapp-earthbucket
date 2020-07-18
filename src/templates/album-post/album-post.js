import React, { Component, createRef } from 'react'
import { graphql, navigate } from 'gatsby'
import Img from 'gatsby-image'
import { Button, CommentSection, SEO } from 'atoms'
import { EmailForm, ScriptureSection } from 'molecules'
import { InventoryItemActivityMenu, Layout } from 'organisms'
import styles from './album-post.module.scss'
import { ButtonBack, ButtonNext, CarouselProvider, DotGroup, Image, Slide, Slider } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css';
import classNames from 'classnames'

class InventoryItemTemplate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			inventoryItemEvent: []
		}
		this.inventoryItemActivityMenuRef = createRef()
	}
	onInventoryItemEvent (inventoryItemEvent) {
		this.setState( { inventoryItemEvent, shouldShowDoubleClickAnimation: true }, () => {
			const removeClikcAnimationFromViewport = setTimeout(() => {
				clearTimeout(removeClikcAnimationFromViewport)
				this.setState( { shouldShowDoubleClickAnimation: false })
			}, 500)
		})
	}
	onDoubleClick() {
		const { hasBeenCollected } = this.inventoryItemActivityMenuRef.current.state
		if(!hasBeenCollected) {
			this.inventoryItemActivityMenuRef.current.addToList()
		} else {
			this.inventoryItemActivityMenuRef.current.removeFromList()
		}
	}
	render() {
		const { inventoryItemEvent, shouldShowDoubleClickAnimation } = this.state
		const { data, location, pageContext: { s3ObjectList } } = this.props
		const {
	    	//id,
	    	categories,
	    	price,
	        moreInfoUrl,
	        summary,
	        title
	    } = data.item
		let isModal = false
	    // We don't want to show the modal if
	    // 1. a user navigates directly to a post
	    // 2. the viewport is less than 750
	    // so if this code is running on Gatsby's initial render OR if window inner width less than or equal to 750
	    	// then we don't show the modal
	    // else
	    	// show modal
	    if (
	      typeof window !== `undefined` &&
	      window.___INVENTORYFAITH_INITIAL_RENDER_COMPLETE
	    ) {
	    	if (window.innerWidth > 750) {
		      isModal = true
		    }
	    }

	    const windowClassName = classNames({
	    	[styles.window]: true,
	    	[styles.brighten]: !isModal
	    })

	    const html = `<p>${decodeURIComponent(summary).split("\n").join("<br/>")}</p>`

		return (
			<Layout
				inventoryItemEvent={this.state.inventoryItemEvent}
				isModal={isModal}
				location={location}>
				<SEO
					title={title}
					keywords={categories}
					openGraphImgSrc={s3ObjectList[0].childImageSharp.fluid.src}
				/>
				<div className={windowClassName}>
					<section>
						<div className={styles.gallery} onDoubleClick={() => { this.onDoubleClick() }}>
							{shouldShowDoubleClickAnimation && <div className={styles.likeAnimation}>
								{inventoryItemEvent.type === 'LIKED' && <i className='font-icon-like' />}
								{inventoryItemEvent.type === 'DISLIKED' && <i className='font-icon-dislike' />}
							</div>}
							<CarouselProvider
								naturalSlideWidth={300}
								naturalSlideHeight={311}
								isIntrinsicHeight={true}
								totalSlides={s3ObjectList.length}
								>
								<Slider className={styles.slider} moveThreshold={.05}>
	          						{s3ObjectList.map( ({ childImageSharp, publicURL }, i) => <Slide key={i} index={i} className={styles.slide}><Image src={childImageSharp.fluid.src} /></Slide> )}
	          					</Slider>
	          					<div className={styles.leftAndRightButtons}>
		          					<div className={styles.leftButton}>
		          						<ButtonBack><i className="font-icon-left" /></ButtonBack>
		          					</div>
		          					<div className={styles.rightButton}>
		          						<ButtonNext><i className="font-icon-right" /></ButtonNext>
		          					</div>
	          					</div>
	          					<div className={styles.dots}>
	          						<DotGroup />
	          					</div>
							</CarouselProvider>
						</div>
						<div className={styles.info}>
							<div className={styles.content}>
								<h2>{title}</h2>
								<div className={styles.categories}>{categories.map( (category, i) => (
										<Button
											key={i}
											label={category}
											onClick={e => {
												e.preventDefault()
												navigate(`/i/category/${category}`)
											}}
											className={styles.iconButton}
											fontIcon={`category-${category}`}
										/>
									)
								)}</div>
								<div className={styles.description}>
									<div dangerouslySetInnerHTML={{'__html': html }} />
								</div>
								<p><em>{`appx $${price}`}</em></p>
							</div>
							<InventoryItemActivityMenu
								item={data.item}
								moreInfoUrl={moreInfoUrl}
								onInventoryItemEvent={ e => this.onInventoryItemEvent(e) }
								ref={this.inventoryItemActivityMenuRef}
							/>
						</div>
					</section>
					<CommentSection isModal={isModal} />
					<div className={styles.emailForm}>
						<EmailForm isModal={isModal} />
					</div>
				</div>
			</Layout>
		)
	}
}
export default InventoryItemTemplate
export const pageQuery = graphql`
query ($id: String!) {
  item: albumPosts(id: {eq: $id}) {
  	alternative_id
  	categories
    id
    images
    moreInfoUrl
    price
    summary
    title
  }
}
`