import React, { PropTypes } from 'react'
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

function SplashScreen({ navigator }) {
  return (
    <View style={styles.root}>
      <Text>Loading</Text>
    </View>
  )
}

SplashScreen.propTypes = {
  navigator: PropTypes.object.isRequired,
}

export default SplashScreen

// onStartShouldSetResponder={() => navigator.push(routes.gameScreen)