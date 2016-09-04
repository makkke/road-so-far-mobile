import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Alert,
  StatusBar, StyleSheet, View, ListView, Text, TouchableNativeFeedback,
} from 'react-native'

import routes from '../../../routes'
import { actions } from '../fuelPurchases.module'
import FuelPurchaseItem from './FuelPurchaseItem'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#34385d',
  },
  list: {
    // flex: 1,
    // width,
    paddingHorizontal: 8,
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

    // Alert.alert('debug', JSON.stringify(data))
    this.dataSource = new ListView.DataSource({
      // getSectionData: (data, sectionId) => data[sectionId],
      // getRowData: (data, sectionId, rowId) => data[`${sectionId}:${rowId}`],
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    })
  }

  renderSectionHeader(data) {
    return (
      <View style={styles.section}>
        <Text>{data}</Text>
      </View>
    )
  }

  renderRow = (data) => {
    return (
      <FuelPurchaseItem {...data} />
    )
  }

  renderSeparator = (sectionId, rowId) => {
    return (
      <View
        key={`${sectionId}-${rowId}`}
        style={{
          height: 2,
          backgroundColor: '#34385d',
        }}
      />
    )
  }

  render() {
    const { fuelPurchases } = this.props
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ]
    const data = {}
    const map = new Map()

    fuelPurchases.forEach(fuelPurchase => {
      const createdAt = new Date(fuelPurchase.createdAt)
      const sectionId = `${createdAt.getMonth()}${createdAt.getFullYear()}`

      if (map.has(sectionId)) {
        const rows = map.get(sectionId)
        rows.push(fuelPurchase.id)
        data[`${sectionId}:${fuelPurchase.id}`] = fuelPurchase
      } else {
        map.set(sectionId, [fuelPurchase.id])
        data[sectionId] = `${months[createdAt.getMonth()]}, ${createdAt.getFullYear()}`
      }
    })

    const sectionIds = [...map.keys()]
    const rowIds = [...map].map(x => x[1])

    // const dataSource = this.dataSource.cloneWithRows(this.props.fuelPurchases)
    // const dataSource = this.dataSource.cloneWithRowsAndSections(data, sectionIds, rowIds)
    const dataSource = this.dataSource.cloneWithRowsAndSections(data, sectionIds)

    return (
      <View style={styles.root}>
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.1)" />
        <TouchableNativeFeedback
          onPress={() => this.props.navigator.push(routes.createFuelPurchaseScreen)}
        >
          <View>
            <Text style={styles.buttonText}>Create New</Text>
          </View>
        </TouchableNativeFeedback>
        <ListView
          style={styles.list}
          dataSource={dataSource}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
        />
      </View>
    )
  }
}

function mapStateToProps(store) {
  // this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)

  return {
    fuelPurchases: store.fuelPurchases.fuelPurchases,
    dataSource: store.fuelPurchases.fuelPurchases,
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(FuelPurchasesScreen)
