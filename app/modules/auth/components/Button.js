import React, { PropTypes } from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 54,
    width: 300,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    borderRadius: 100,
  },
  text: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'avenir',
  },
})

function Button({ text, ...props }) {
  return (
    <TouchableHighlight underlayColor="transparent" {...props}>
      <View style={styles.root}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableHighlight>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Button
