import React from 'react'
import { AppRegistry } from 'react-native'

import Root from './app/Root'
import { configureStore } from './app/store'
import { authenticate } from './app/modules/auth/auth.module'

const store = configureStore()
store.dispatch(authenticate())

function RoadSoFar() {
  return <Root {...this.props} store={store} />
}

AppRegistry.registerComponent('roadsofar', () => RoadSoFar)
