import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Sae } from 'react-native-textinput-effects'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import {
  StyleSheet, View, TextInput, TouchableWithoutFeedback, Text, Picker,
  TouchableNativeFeedback, DatePickerAndroid, StatusBar,
} from 'react-native'

import routes from '../../../routes'
import { actions } from '../fuelPurchases.module'
import { regions } from '../../../utils/data'

import Toolbar from '../../../components/Toolbar'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  form: {
    paddingVertical: 64,
    paddingHorizontal: 30,
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

  showPicker = async (stateKey, options) => {
    try {
      const newState = {}
      const { action, year, month, day } = await DatePickerAndroid.open(options)
      if (action === DatePickerAndroid.dismissedAction) {
        // newState[stateKey + 'Text'] = 'dismissed'
      } else {
        const date = new Date(year, month, day)
        // newState[stateKey + 'Text'] = date.toLocaleDateString()
        // newState[stateKey + 'Date'] = date
      }
      // this.setState(newState)
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message)
    }
  }

  render() {
    return (
      <View style={styles.root}>
        <StatusBar backgroundColor="#1f223b" />
        <Toolbar title="New Fuel Purchase" />
        <View style={styles.form}>
          <TouchableWithoutFeedback
            onPress={this.showPicker}
          >
            <View>
              <Sae
                label={'Date'}
                iconClass={FontAwesomeIcon}
                // iconName={'pencil'}
                // TextInput props
                autoCapitalize={'none'}
                autoCorrect={false}
              />
            </View>
          </TouchableWithoutFeedback>
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
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(null, mapDispatchToProps)(CreateFuelPurchaseScreen)
