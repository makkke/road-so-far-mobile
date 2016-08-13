import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { StyleSheet, View, ListView, TouchableHighlight, Text } from 'react-native'

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
      rowHasChanged: (r1, r2) => r1.id !== r2.id,
    })
  }

  renderRow = (row) => {
    return (
      <TouchableHighlight underlayColor="#dddddd">
        <View>
          <Text>{row.region} {row.volume} L for ${row.total}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    const dataSource = this.dataSource.cloneWithRows(this.props.fuelPurchases)

    return (
      <ListView
        dataSource={dataSource}
        renderRow={this.renderRow}
      />
    )
  }
}

function mapStateToProps(store) {
  return {
    fuelPurchases: store.fuelPurchases.fuelPurchases,
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(FuelPurchasesScreen)
