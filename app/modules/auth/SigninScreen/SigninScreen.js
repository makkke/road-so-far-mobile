import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StatusBar, StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native'
import dismissKeyboard from 'dismissKeyboard' // eslint-disable-line

import { actions } from '../auth.module'
import routes from '../../../routes'
import AuthTextInput from '../components/AuthTextInput'
import Hint from '../components/Hint'
import Button from '../components/Button'

function getStyles() {
  const styles = StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: 'space-between',
      width: null,
      height: null,
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    logo: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 56,
    },
    logoImage: {
      width: 180,
      height: 70,
      resizeMode: 'contain',
    },
    footer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
    },
  })

  return styles
}

class SigninScreen extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }

  state = {
    email: '',
    password: '',

    loading: false,
  }

  handleSubmit = () => {
    const { email, password } = this.state
    this.setState({ loading: true })
    this.props.actions
      .login(email, password)
      .then(() => {
        this.setState({ loading: false })
        this.props.navigator.push(routes.fuelPurchasesScreen)
      })
  }

  render() {
    const styles = getStyles(this.state)
    const buttonText = this.state.loading ? 'Signing In...' : 'Sign In'

    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <Image source={require('./signin-bg.webp')} style={styles.root}>
          <StatusBar backgroundColor="#5A5796" />
          <View style={styles.logo}>
            <Image source={require('../logo.png')} style={styles.logoImage} />
          </View>
          <View>
            <AuthTextInput
              icon={require('../icon-email.png')}
              placeholder="Email"
              keyboardType="email-address"
              returnKeyType="next"
              value={this.state.email}
              onChangeText={(email) => this.setState({ email })}
              onSubmitEditing={() => this.passwordInput.focus()}
            />
            <AuthTextInput
              reference={(ref) => { this.passwordInput = ref }}
              icon={require('../icon-password.png')}
              placeholder="Password"
              secureTextEntry
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              onSubmitEditing={this.handleSubmit}
            />
          </View>
          <View style={styles.footer}>
            <Button
              onPress={this.handleSubmit}
              text={buttonText}
            />
            <Hint
              primaryText="Don't have an account?"
              secondaryText="Sign Up"
              onPress={() => this.props.navigator.push(routes.signupScreen)}
            />
          </View>
        </Image>
      </TouchableWithoutFeedback>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SigninScreen)
