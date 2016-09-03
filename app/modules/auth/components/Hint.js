import React, { PropTypes } from 'react'
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native'

const styles = StyleSheet.create({
  root: {
    marginTop: 40,
  },
  primaryText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'avenir',
    fontSize: 12,
  },
  secondaryText: {
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: 'avenir',
    fontSize: 12,
  },
})

function AuthTextInput({ primaryText, secondaryText, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.root}>
        <Text>
          <Text style={styles.primaryText}>{primaryText}</Text>
          <Text style={styles.secondaryText}> {secondaryText}</Text>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

AuthTextInput.propTypes = {
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default AuthTextInput
