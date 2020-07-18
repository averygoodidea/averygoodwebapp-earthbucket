import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { graphql, navigate, useStaticQuery } from "gatsby"
import { AuthorNavbar } from "molecules"
import { AuthorHeader } from 'organisms'
import styles from "./author-layout.scss"
import "../layout/layout.scss"

const AuthorLayout = ({ children, isModal, isAuthenticated, location, sectionTitle }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)
  // set nav bar items
  const navbarItems = [{
    fontIcon: 'inventory-item',
    onClick: e => navigate(e.targetView),
    targetView: '/author/album/',
    title: 'Album Posts'
  },
  {
    fontIcon: 'adjust',
    onClick: e => navigate(e.targetView),
    targetView: '/author/site-settings/',
    title: 'Site Settings'
  }]

  const currentView = location.pathname

  return (
    <Fragment>
      <div id="terrain"></div>
      <main>
        <Fragment>
          <AuthorHeader
            authenticationState={isAuthenticated ? 'signedIn' : 'signedOut'}
            sectionTitle={sectionTitle}
            siteTitle={data.site.siteMetadata.title}
            siteDescription={data.site.siteMetadata.description}
          />
            <div className="wrapper">
              <div className="container-fluid">
                {isAuthenticated && <AuthorNavbar items={navbarItems} currentView={currentView} />}
                {children}
              </div>
            </div>
          <footer>
            <span>© {new Date().getFullYear()}</span> <a className="avgi" href="https://averygoodidea.com/" target="_blank" rel="noopener noreferrer"><i className="font-icon-averygoodidea-logo"></i></a>
          </footer>
        </Fragment>
      </main>
    </Fragment>
  )
}

AuthorLayout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object
}
AuthorLayout.defaultProps = {
  location: {}
}

export default AuthorLayout