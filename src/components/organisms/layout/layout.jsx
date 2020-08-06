import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql, PageRenderer, useStaticQuery } from 'gatsby'
import { Footer, Header } from 'organisms'
import './layout.scss'

let Modal
import("./modal/modal").then( modal => {
  Modal = modal.default
})

const Layout = ({ children, isModal, location, sectionTitle }) => {
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
  return (
    <div data-testid="layout">
      <div id="background-graphic" />
      <main>
      {isModal ? (
        <Fragment>
          <PageRenderer location={{
            pathname: location.state.previousPathname,
            state: {
              defaultAmountToShow: location.state.previousAmountToShow,
              defaultScrollY: location.state.previousScrollY,
              defaultCategoryFilterScrollLeft: location.state.defaultCategoryFilterScrollLeft
            }
          }} />
          <Modal isOpen={true} location={location}>
            {children}
          </Modal>
        </Fragment>
      ) : (
        <Fragment>
          <Header
            location={location}
            sectionTitle={sectionTitle}
            siteTitle={data.site.siteMetadata.title}
            siteDescription={data.site.siteMetadata.description}
          />
            <div className="wrapper">
              <div className="container-fluid">
                {children}
              </div>
            </div>
          <Footer />
        </Fragment>
      )}
      </main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isModal: PropTypes.bool,
  sectionTitle: PropTypes.string
}
Layout.defaultProps = {
  isModal: false,
  location: {
    pathname: "/",
    state: {}
  }
}

export default Layout
