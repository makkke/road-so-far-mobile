import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Navigator, Text } from 'react-native'
import SplashScreen from 'rn-splash-screen'

import router from '../../router'
import routes from '../../routes'

class App extends Component {
  constructor(props) {
    super(props)

    // Hide the active splash screen
    SplashScreen.hide()
  }

  render() {
    const initialRoute = this.props.isAuthenticated ? routes.fuelPurchasesScreen : routes.signinScreen

    return (
      <Navigator
        initialRoute={initialRoute}
        configureScene={router.configureScene}
        renderScene={router.renderScene}

      />
    )
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}

function mapStateToProps(store) {
  return {
    isAuthenticated: store.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps)(App)
