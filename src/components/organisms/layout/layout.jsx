import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql, Link, PageRenderer, useStaticQuery } from 'gatsby'
import { Header } from 'organisms'
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
          <footer>
            <div className="wrapper">
                <div className="row">
                  <div className="col-sm-offset-2 col-sm-4">
                    <ul>
                      <li><a href="https://github.com/averygoodidea/averygoodwebapp-infrastructure/" target="_blank" rel="noreferrer">Infrastructure Docs</a></li>
                      <li><Link to="/ui/1/docs/">UI Docs</Link></li>
                      <li><Link to="/api/1/docs/">API Docs</Link></li>
                    </ul>
                  </div>
                  <div className="col-sm-4">
                    <ul>
                      <li><Link to="/blog/">Blog</Link></li>
                      <li><Link to="/about/">About</Link></li>
                      <li><Link to="/contact/">Contact</Link></li>
                    </ul>
                  </div>
                </div>
            </div>
          </footer>
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
