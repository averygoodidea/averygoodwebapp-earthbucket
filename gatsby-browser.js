/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

exports.shouldUpdateScroll = args => {
  const windowWidth = window.innerWidth
  // Scroll position only matters on mobile as on larger screens, we use a
  // modal.
  return windowWidth < 750
}

exports.onInitialClientRender = () => {
  window.___AVERYGOODWEBAPP_INITIAL_RENDER_COMPLETE = true
}
