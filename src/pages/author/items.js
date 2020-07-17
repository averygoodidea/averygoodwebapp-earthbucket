import React, { Component } from "react"
import { graphql, navigate } from 'gatsby'
import { SEO } from 'atoms'
import { AuthorItemManager, AuthorLayout } from 'organisms'
import AveryGoodAuthenticator from '../../assets/js/averygoodauthenticator'

class AuthorItemsPage extends Component {
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
		const { data: { allInventoryItems }, location } = this.props
		return(
			<AuthorLayout isAuthenticated={isAuthenticated} location={location} sectionTitle='Manage'>
				<SEO title="Create Item" />
				{isAuthenticated && <AuthorItemManager
					allInventoryItems={allInventoryItems.edges}
					mode={'CREATE'}
				/>}
			</AuthorLayout>
		)
	}
}
export default AuthorItemsPage
export const pageQuery = graphql`
	query {
      allInventoryItems(sort: {order: DESC, fields: createdAt}, filter: {id: {ne: "dummy"}}) {
        edges {
          node {
          	alternative_id
            id
            categories
            createdAt
            images
            moreInfoUrl
            price
            slugId
            summary
            title
          }
        }
      }
      allInventoryItemImages: allS3Object(filter: {Key: {regex: "^inventory/items/" }}) {
        edges {
          node {
            id
            Key
            ...S3Image
          }
        }
      }
    }
`