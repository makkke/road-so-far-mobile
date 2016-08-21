import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, Alert } from 'react-native'

import routes from '../../routes'

const styles = StyleSheet.create({
  root: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#644B62',
  },
})

class SplashScreen extends Component {
  // constructor(props) {
  //   super(props)
  //   Alert.alert('debug', JSON.stringify(props.auth))
  // }

  // componentWillReceiveProps(nextProps) {
  //   const { auth, navigator } = nextProps
  //   if (auth.isAuthenticated) {
  //     navigator.push(routes.fuelPurchasesScreen)
  //   } else if (!auth.isAuthenticated && !auth.isAuthenticating) {
  //     navigator.push(routes.loginScreen)
  //   }
  // }

  render() {
    return (
      <View style={styles.root}>
        <Text>Loading...</Text>
      </View>
    )
  }
}

SplashScreen.propTypes = {
  navigator: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

function mapStateToProps(store) {
  return {
    auth: store.auth,
    isAuthenticating: store.auth.isAuthenticating,
  }
}

export default connect(mapStateToProps)(SplashScreen)
