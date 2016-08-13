import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  StyleSheet, View, Text, TextInput, TouchableHighlight,
  AsyncStorage,
} from 'react-native'

import { actions } from './auth.module'
import routes from '../../routes'

const styles = StyleSheet.create({
  root: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#644B62',
  },
})

class LoginScreen extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }

  state = {
    email: 'slava.eth@gmail.com',
    password: 'test',
  }

  handleSubmit = () => {
    const { email, password } = this.state
    this.props.actions
      .login(email, password)
      .then(token => {
        AsyncStorage.setItem('token', token)
        this.props.navigator.push(routes.fuelPurchasesScreen)
      })
      .catch((err) => {
        console.log(err)
        AsyncStorage.removeItem('token')
      })
  }

  render() {
    return (
      <View style={styles.root}>
        <TextInput
          placeholder="Email"
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="Password"
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
        />
        <TouchableHighlight onPress={this.handleSubmit}>
          <View>
            <Text>Login</Text>
          </View>
        </TouchableHighlight>
      </View>
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

// onStartShouldSetResponder={() => navigator.push(routes.gameScreen)}
