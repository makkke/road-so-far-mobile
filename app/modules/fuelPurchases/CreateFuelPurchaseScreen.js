import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  StyleSheet, View, TextInput, TouchableHighlight, Text, Picker,
  TouchableNativeFeedback,
} from 'react-native'

import routes from '../../routes'
import { actions } from './fuelPurchases.module'
import { regions } from '../../utils/data'

const styles = StyleSheet.create({
  root: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#644B62',
  },
})

class CreateFuelPurchaseScreen extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }

  state = {
    region: '',
    volume: '',
    total: '',
    createdAt: '',
  }

  handleSubmit = () => {
    const fuelPurchase = {
      ...this.state,
      createdAt: new Date(),
    }

    this.props.actions
      .createFuelPurchase(fuelPurchase)
      .then(() => {
        this.props.actions.loadFuelPurchases()
        this.props.navigator.pop()
      })
  }

  render() {
    return (
      <View style={styles.root}>
        <Picker
          selectedValue={this.state.region}
          onValueChange={(region) => this.setState({ region })}
        >
          {regions.map(x => <Picker.Item key={x.id} label={x.name} value={x.id} />)}
        </Picker>
        <TextInput
          placeholder="Volume"
          value={this.state.volume}
          onChangeText={(volume) => this.setState({ volume })}
        />
        <TextInput
          placeholder="Total"
          value={this.state.total}
          onChangeText={(total) => this.setState({ total })}
        />
        <TouchableNativeFeedback onPress={this.handleSubmit}>
          <View>
            <Text>Create Fuel Purchase</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(null, mapDispatchToProps)(CreateFuelPurchaseScreen)
