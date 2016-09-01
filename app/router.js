import React from 'react'
import transitions from './components/transitions'

export default {
  renderScene(route, navigator) {
    return React.createElement(route.component, { navigator })
  },

  configureScene(route) {
    return route.customConfiguration || transitions.default
  },
}
