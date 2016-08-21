import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  StyleSheet, View, ListView, TouchableHighlight, Text,
  TouchableNativeFeedback,
} from 'react-native'

import routes from '../../routes'
import { actions } from './fuelPurchases.module'

const styles = StyleSheet.create({
  root: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#644B62',
  },
})

class FuelPurchasesScreen extends Component {
  static propTypes = {
    fuelPurchases: PropTypes.array.isRequired,
    navigator: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.props.actions.loadFuelPurchases()
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
  }

  renderRow = (row) => {
    return (
      <TouchableHighlight>
        <View>
          <Text>{row.region} {row.volume} L for ${row.total}</Text>
          <TouchableHighlight onPress={() => this.props.actions.removeFuelPurchase(row.id)}>
            <Text>X</Text>
          </TouchableHighlight>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    // Alert.alert('debug2', JSON.stringify(this.props.fuelPurchases.length))
    const dataSource = this.dataSource.cloneWithRows(this.props.fuelPurchases)

    return (
      <View>
        <TouchableNativeFeedback
          onPress={() => this.props.navigator.push(routes.createFuelPurchaseScreen)}
        >
          <View>
            <Text style={styles.buttonText}>Create New</Text>
          </View>
        </TouchableNativeFeedback>
        <ListView
          dataSource={dataSource}
          renderRow={this.renderRow}
        />
      </View>
    )
  }
}

function mapStateToProps(store) {
  // Alert.alert('debug1', JSON.stringify(store.fuelPurchases.fuelPurchases.length))
  return {
    fuelPurchases: store.fuelPurchases.fuelPurchases,
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(FuelPurchasesScreen)
