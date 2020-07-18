import React, { Component } from "react"
import { graphql, navigate } from 'gatsby'
import { SEO } from 'atoms'
import { AuthorItemManager, AuthorLayout } from 'organisms'
import AveryGoodAuthenticator from '../../assets/js/averygoodauthenticator'

class AuthorInventoryItemTemplate extends Component {
	constructor() {
		super()
		this.state = {
			isAuthenticated: false,
			navbarItems: []
		}
	}
	componentDidMount() {
		const { verifyAuthentication } = AveryGoodAuthenticator
		verifyAuthentication().then( result => {
			const { isVerified } = result
			if (isVerified) {
				this.setState({ isAuthenticated: isVerified })
			} else {
				// navigate to author signin form
				navigate('/author/', { replace: true })
			}
		})
	}
	render() {
		const { isAuthenticated } = this.state
		const { data: { item }, location, pageContext: { allInventoryItems, s3ObjectList } } = this.props
		return(
			<AuthorLayout isAuthenticated={isAuthenticated} location={location} sectionTitle='Manage'>
				<SEO title="Edit Item" />
				{isAuthenticated && <AuthorItemManager
					allInventoryItems={allInventoryItems}
					mode={'UPDATE'}
					s3={s3ObjectList}
					selectedItem={item}
				/>}
			</AuthorLayout>
		)
	}
}
export default AuthorInventoryItemTemplate
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