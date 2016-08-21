import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'

import App from './modules/app/App'

function Root({ store }) {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
