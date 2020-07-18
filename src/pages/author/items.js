import React, { Component } from "react"
import { graphql, navigate } from 'gatsby'
import { SEO } from 'atoms'
import { AuthorItemManager, AuthorLayout } from 'organisms'
import { AVeryGoodAuthenticator } from 'assets-js'

class AuthorItemsPage extends Component {
	constructor() {
		super()
		this.state = {
			isAuthenticated: false,
			navbarItems: []
		}
	}
	componentDidMount() {
		const { verifyAuthentication } = AVeryGoodAuthenticator
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
		const { data: { allAlbumPosts }, location } = this.props
		return(
			<AuthorLayout isAuthenticated={isAuthenticated} location={location} sectionTitle='Manage'>
				<SEO title="Create Item" />
				{isAuthenticated && <AuthorItemManager
					allInventoryItems={allAlbumPosts.edges}
					mode={'CREATE'}
				/>}
			</AuthorLayout>
		)
	}
}
export default AuthorItemsPage
export const pageQuery = graphql`
	query {
      allAlbumPosts(sort: {order: DESC, fields: createdAt}, filter: {id: {ne: "dummy"}}) {
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
    }
`