import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
} from 'react-native'

function getStyles(props, state) {
  const { size, position } = props
  const tilt = state.tilt.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-30deg'],
  })

  const styles = StyleSheet.create({
    root: {
      position: 'absolute',
      left: position.left,
      top: position.top,
      width: size,
      height: size,
      borderRadius: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
      transform: [{ rotateX: tilt }],
      opacity: props.isVisible ? 1 : 0,
    },
    letter: {
      fontFamily: 'NukamisoLite',
      color: '#333',
      fontSize: Math.floor(size * 0.75),
      backgroundColor: 'transparent',
    },
  })

  return styles
}

class ClickerTile extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    position: PropTypes.shape({
      left: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired,
    }).isRequired,
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    max: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    onClick: PropTypes.func,
  }

  state = {
    tilt: new Animated.Value(0),
  }

  handleClick = () => {
    this.state.tilt.setValue(1)
    Animated.spring(this.state.tilt, {
      toValue: 0,
      duration: 250,
      easing: Easing.quad,
    }).start()
    this.props.onClick()
  }

  render() {
    const styles = getStyles(this.props, this.state)
    const { text } = this.props

    return (
      <Animated.View
        style={styles.root}
        onStartShouldSetResponder={this.handleClick}
      >
        <Text style={styles.letter}>{text}</Text>
      </Animated.View>
    )
  }
}

export default ClickerTile
