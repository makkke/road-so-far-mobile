import React, { Component, PropTypes } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { StyleSheet, Dimensions, Animated } from 'react-native'

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    width,
    bottom: 0,
  },
  loader: {
    height: 4,
    width,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    height: 4,
    width,
    backgroundColor: '#232642',
  },
})

class LoadingBar extends Component {
  constructor(props) {
    super(props)

    this.opacityAnimation = this.state.opacity.interpolate({
      inputRange: [0, 1000],
      outputRange: [1, 0],
    })
  }

  state = {
    left: new Animated.Value(0),
    opacity: new Animated.Value(0),
  }

  componentWillReceiveProps(nextProps, currentProps) {
    const { loading } = nextProps

    if (loading && !currentProps.loading) {
      this.state.left.setValue(0)
      this.state.opacity.setValue(0)
      Animated.sequence([
        Animated.timing(
          this.state.left,
          { toValue: width / 2, duration: 3000 }
        ),
        Animated.timing(
          this.state.left,
          { toValue: width, duration: 3000 }
        ),
      ]).start()
    } else {
      this.state.left.setValue(width)

      Animated.timing(
        this.state.opacity,
        { toValue: 1000, duration: 1500 }
      ).start()
    }
  }

  render() {
    return (
      <Animated.View style={[styles.root, { opacity: this.opacityAnimation }]}>
        <LinearGradient
          style={styles.loader}
          start={[0.0, 0.0]} end={[1.0, 1.0]}
          locations={[0.0, 1.0]}
          colors={['#5352b2', '#3fb1c7']}
        />
        <Animated.View style={[styles.overlay, { transform: [{ translateX: this.state.left }] }]} />
      </Animated.View>
    )
  }
}

LoadingBar.propTypes = {
  loading: PropTypes.bool,
}

LoadingBar.defaultProps = {
  loading: false,
}

export default LoadingBar
