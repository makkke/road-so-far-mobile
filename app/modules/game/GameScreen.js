import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native'

import { actions } from './gameActions'
import routes from '../../routes'
import Board from './Board'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#644B62',
  },
})

class GameScreen extends Component {
  static propTypes = {
    level: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }

  handleWin = (stats) => {
    setTimeout(() => {
      this.props.actions.loadStats(stats)
      this.props.navigator.push(routes.winScreen)
    }, 1000)
  }

  render() {
    const { level } = this.props

    return (
      <View style={styles.root}>
        <Board
          layout={level.layout}
          values={level.values}
          onWin={this.handleWin}
        />
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    level: store.game.level,
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen)
