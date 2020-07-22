import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql, PageRenderer, useStaticQuery } from 'gatsby'
import { Header } from 'organisms'
import './layout.scss'

let Modal
import("../modal/modal").then( modal => {
  Modal = modal.default
})

const Layout = ({ children, albumPostEvent, isModal, location, sectionTitle }) => {
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
    <Fragment>
      <div id="terrain"></div>
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
            albumPostEvent={albumPostEvent}
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
          <footer>
            <span>© {new Date().getFullYear()}</span> <a className="avgi" href="https://averygoodidea.com/" target="_blank" rel="noopener noreferrer"><i className="font-icon-averygoodidea-logo"></i></a>
          </footer>
        </Fragment>
      )}
      </main>
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  sectionTitle: PropTypes.string
}

export default Layout
