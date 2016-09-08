import React, { PropTypes } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

import LoadingBar from './LoadingBar'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: '#232642',
  },
  icon: {
    height: 22,
    width: 22,
  },
  title: {
    fontFamily: 'avenir',
    fontSize: 16,
    color: '#ffffff',
  },
})

function Toolbar({ title, loading }) {
  return (
    <View>
      <View style={styles.root}>
        <Image style={styles.icon} source={require('./icon-menu.png')} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.icon} />
      </View>
      <LoadingBar loading={loading} />
    </View>
  )
}

Toolbar.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool,
}

Toolbar.defaultProps = {
  loading: false,
}

export default Toolbar
