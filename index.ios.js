import React from 'react'
import { AppRegistry } from 'react-native'

import App from './app'
import { configureStore } from './app/store'

const store = configureStore()

function RoadSoFar() {
  return <App {...this.props} store={store} />
}

AppRegistry.registerComponent('roadsofar', () => RoadSoFar)
