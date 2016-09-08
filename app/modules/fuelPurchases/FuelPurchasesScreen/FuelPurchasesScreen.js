import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient' // eslint-disable-line
import ActionButton from 'react-native-action-button'
import { StatusBar, StyleSheet, View, ListView, Text } from 'react-native'

import routes from '../../../routes'
import { actions } from '../fuelPurchases.module'
import Toolbar from '../../../components/Toolbar'
import FuelPurchaseItem from './FuelPurchaseItem'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#34385d',
  },
  list: {
    paddingHorizontal: 8,
  },
  rowSeparator: {
    height: 2,
    backgroundColor: '#34385d',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
  },
  sectionSeparator: {
    flex: 1,
    height: 1,
  },
  sectionText: {
    fontFamily: 'avenir',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.3)',
  },
})

class FuelPurchasesScreen extends Component {
  static propTypes = {
    fuelPurchases: PropTypes.array.isRequired,
    navigator: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)

    // Alert.alert('debug', JSON.stringify(data))
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    })

    this.state = {
      dataSource,
    }
  }

  componentDidMount() {
    this.props.actions.loadFuelPurchases()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fuelPurchases !== this.props.fuelPurchases) {
      const { data, sectionIds } = this.getListViewData(nextProps.fuelPurchases)

      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(data, sectionIds),
      })
    }
  }

  getListViewData(fuelPurchases) {
    function mapToObj(strMap) {
      const obj = {}
      for (const [k, v] of strMap) {
        obj[k] = v
      }
      return obj
    }

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ]

    const map = new Map()

    fuelPurchases.forEach(fuelPurchase => {
      const createdAt = new Date(fuelPurchase.createdAt)
      const sectionId = `${months[createdAt.getMonth()].toUpperCase()}, ${createdAt.getFullYear()}`

      if (map.has(sectionId)) {
        const rows = map.get(sectionId)
        rows.push(fuelPurchase)
      } else {
        map.set(sectionId, [fuelPurchase])
      }
    })

    const data = mapToObj(map)
    const sectionIds = [...map.keys()]

    return { data, sectionIds }
  }

  renderSectionHeader(data, sectionId) {
    // Alert.alert('debug', JSON.stringify(data))
    return (
      <View style={styles.section}>
        <LinearGradient
          start={[0.0, 0.0]} end={[1.0, 1.0]}
          locations={[0, 0.75]}
          colors={['#4d517d', '#34385d']}
          style={styles.sectionSeparator}
        />
        <Text style={styles.sectionText}>{sectionId}</Text>
        <LinearGradient
          start={[0.0, 0.0]} end={[1.0, 1.0]}
          locations={[0.25, 1.0]}
          colors={['#34385d', '#4d517d']}
          style={styles.sectionSeparator}
        />
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
        style={styles.rowSeparator}
      />
    )
  }

  render() {
    return (
      <View style={styles.root}>
        <StatusBar backgroundColor="#1f223b" />
        <Toolbar title="Fuel Purchases" loading={this.props.loading} />
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderSectionHeader={this.renderSectionHeader}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
        />
        <ActionButton
          buttonColor="rgba(130, 158, 254, 1)"
          onPress={() => { this.props.navigator.push(routes.createFuelPurchaseScreen) }}
        />
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    fuelPurchases: store.fuelPurchases.fuelPurchases,
    loading: store.fuelPurchases.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(FuelPurchasesScreen)
