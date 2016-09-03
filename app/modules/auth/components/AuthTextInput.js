import React, { PropTypes } from 'react'
import { StyleSheet, View, TextInput, Image } from 'react-native'

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 30,
  },
  icon: {
    marginRight: 16,
    width: 22,
    resizeMode: 'contain',
  },
  wrapper: {
    flex: 1,
    height: 44,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderBottomWidth: 1,
  },
  text: {
    paddingLeft: 0,
    color: '#ffffff',
    fontFamily: 'avenir',
    fontSize: 16,
  },
  placeholder: {
    fontFamily: 'avenir',
    fontSize: 16,
  },
})

function AuthTextInput({ icon, reference, ...props }) {
  return (
    <View style={styles.root}>
      <Image
        style={styles.icon}
        source={icon}
      />
      <View style={styles.wrapper}>
        <TextInput
          ref={reference}
          style={styles.text}
          underlineColorAndroid="rgba(0, 0, 0, 0)"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          {...props}
        />
      </View>
    </View>
  )
}

AuthTextInput.propTypes = {
  icon: PropTypes.number.isRequired,
  reference: PropTypes.func,
}

export default AuthTextInput
