import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text } from 'react-native'

import routes from '../../routes'

const styles = StyleSheet.create({
  root: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#644B62',
  },
})

function SplashScreen({ navigator, auth }) {
  console.log(auth)
  if (auth.isAuthenticated) {
    navigator.push(routes.fuelPurchasesScreen)
  }

  if (!auth.isAuthenticated && !auth.isAuthenticating) {
    navigator.push(routes.loginScreen)
  }

  return (
    <View style={styles.root}>
      <Text>Loading</Text>
    </View>
  )
}

SplashScreen.propTypes = {
  navigator: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

function mapStateToProps(store) {
  return {
    auth: store.auth,
  }
}

export default connect(mapStateToProps)(SplashScreen)
