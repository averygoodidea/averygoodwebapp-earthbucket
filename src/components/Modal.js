import React from 'react'

/* this mock resolves the pesky react-modal ./components/Mock error that jest generates */

const MockReactModal = () => <div />
MockReactModal.setAppElement = () => {}
export default MockReactModal