import React from 'react'
import { AppRegistry } from 'react-native'

import App from './app'
import { configureStore } from './app/store'
// import { loginSuccess } from './app/modules/auth/auth.module'

const store = configureStore()
// AsyncStorage.getItem('token').then(token => store.dispatch(loginSuccess(token)))

function RoadSoFar() {
  return <App {...this.props} store={store} />
}

AppRegistry.registerComponent('roadsofar', () => RoadSoFar)
