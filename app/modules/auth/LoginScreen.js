import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  StatusBar, StyleSheet,
  View, Text, TextInput, Image,
  TouchableHighlight, TouchableWithoutFeedback,
} from 'react-native'
import dismissKeyboard from 'dismissKeyboard' // eslint-disable-line

import { actions } from './auth.module'
import routes from '../../routes'

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
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 54,
      width: 300,
      borderColor: '#ffffff',
      borderWidth: 1,
      borderRadius: 100,
    },
    buttonText: {
      fontSize: 16,
      color: '#ffffff',
    },
    hintText: {
      paddingTop: 40,
      fontSize: 12,
      color: '#ffffff',
    },
    input: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 30,
    },
    inputIcon: {
      marginRight: 16,
      width: 22,
      resizeMode: 'contain',
    },
    inputWrapper: {
      flex: 1,
      borderBottomColor: 'rgba(255, 255, 255, 0.2)',
      // opacity: 0.2,
      borderBottomWidth: 2,
    },
    inputText: {
      paddingLeft: 0,
      color: '#ffffff',
      // opacity: 1,
    },
  })

  return styles
}

class LoginScreen extends Component {
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
    this.setState({ loading: true })
    setTimeout(() => this.setState({ loading: false }), 2000)
    // const { email, password } = this.state
    // this.props.actions
    //   .login(email, password)
    //   .then(() => {
    //     this.props.navigator.push(routes.fuelPurchasesScreen)
    //   })
  }

  render() {
    const styles = getStyles(this.state)
    const buttonText = this.state.loading ? 'Signing In...' : 'Sign In'

    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <Image source={require('../../../assets/images/login-background.png')} style={styles.root}>
          <StatusBar
            backgroundColor="#5A5796"
          />
          <View style={styles.logo}>
            <Image source={require('../../../assets/images/logo.png')} style={styles.logoImage} />
          </View>
          <View>
            <View style={styles.input}>
              <Image
                source={require('../../../assets/images/icon-truck.png')}
                style={styles.inputIcon}
              />
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.inputText}
                  underlineColorAndroid="rgba(0, 0, 0, 0)"
                  placeholderTextColor="#ffffff"
                  placeholder="Email"
                  keyboardType="email-address"
                  returnKeyType="next"
                  value={this.state.email}
                  onChangeText={(email) => this.setState({ email })}
                  onSubmitEditing={() => this.passwordInput.focus()}
                />
              </View>
            </View>
            <View style={styles.input}>
              <Image
                source={require('../../../assets/images/icon-password.png')}
                style={styles.inputIcon}
              />
              <TextInput
                ref={(ref) => { this.passwordInput = ref }}
                style={styles.inputText}
                underlineColorAndroid="rgba(0, 0, 0, 0)"
                placeholderTextColor="#ffffff"
                placeholder="Password"
                secureTextEntry
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
              />
            </View>
          </View>
          <View style={styles.footer}>
            <TouchableHighlight onPress={this.handleSubmit} underlayColor="transparent">
              <View style={styles.button}>
                <Text style={styles.buttonText}>{buttonText}</Text>
              </View>
            </TouchableHighlight>
            <View>
              <Text style={styles.hintText}>Don't have an account? Sign Up</Text>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
