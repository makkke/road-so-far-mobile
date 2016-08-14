import React from 'react'
import { AppRegistry } from 'react-native'

import App from './app'
import { configureStore } from './app/store'
import { authenticate } from './app/modules/auth/auth.module'

const store = configureStore()
store.dispatch(authenticate())

function RoadSoFar() {
  return <App {...this.props} store={store} />
}

AppRegistry.registerComponent('roadsofar', () => RoadSoFar)
