import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { StyleSheet, View, Text } from 'react-native'

import { actions } from './gameActions'
import routes from '../../routes'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#644B62',
  },
})

function WinScreen(props) {
  const { wrong } = props.stats
  const stars = wrong >= 5 ? 0 : 5 - props.stats.wrong

  return (
    <View
      style={styles.root}
      onStartShouldSetResponder={() => {
        props.actions.loadNextLevel()
        props.navigator.push(routes.gameScreen)
      }}
    >
      <Text>You Won!</Text>
      <Text>{Array(stars).fill('*')}</Text>
      <Text>Click to continue...</Text>
    </View>
  )
}

WinScreen.propTypes = {
  navigator: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  stats: PropTypes.object.isRequired,
}


function mapStateToProps(store) {
  return {
    stats: store.game.stats,
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(WinScreen)
