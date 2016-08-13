import React, { PropTypes } from 'react'
import { Navigator } from 'react-native'
import { Provider } from 'react-redux'

import router from './router'
import routes from './routes'

function App({ store }) {
  return (
    <Provider store={store}>
      <Navigator
        initialRoute={routes.loginScreen}
        configureScene={router.configureScene}
        renderScene={router.renderScene}
      />
    </Provider>
  )
}

App.propTypes = {
  store: PropTypes.object.isRequired,
}

export default App
