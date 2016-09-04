import React, { PropTypes } from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'

import { regions, isProvince } from '../../../utils/data'

const styles = StyleSheet.create({
  root: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
  },
  date: {
    width: 20,
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  dateDay: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'avenir',
  },
  dateMonth: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'avenir',
  },
  location: {
    flex: 4,
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  locationCity: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'avenir',
  },
  locationRegion: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'avenir',
  },
  quantity: {
    flex: 1,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  quantityText: {
    fontSize: 18,
    color: '#829efe',
    fontFamily: 'avenir',
  },
  quantityUnit: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'avenir',
  },
  amount: {
    flex: 1,
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  amountText: {
    fontSize: 20,
    color: '#53cae3',
    fontFamily: 'avenir',
  },
  amountUnit: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'avenir',
  },
})

function FuelPurchaseItem(props) {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ]
  const { createdAt, location, quantity, amount } = props
  const date = new Date(createdAt)
  const region = regions.find(x => x.id === location.region)

  return (
    <TouchableHighlight>
      <View>
        <View style={styles.root}>
          <View style={styles.date}>
            <Text style={styles.dateDay}>{date.getDate()}</Text>
            <Text style={styles.dateMonth}>{months[date.getMonth()].toUpperCase()}</Text>
          </View>
          <View style={styles.location}>
            <Text style={styles.locationCity}>{location.city}</Text>
            <Text style={styles.locationRegion}>{region.name}, {location.region.toUpperCase()}</Text>
          </View>
          <View style={styles.quantity}>
            <Text style={styles.quantityText}>{quantity}</Text>
            <Text style={styles.quantityUnit}>{isProvince(region.id) ? 'LTR' : 'GAL'}</Text>
          </View>
          <View style={styles.amount}>
            <Text style={styles.amountText}>${amount}</Text>
            <Text style={styles.amountUnit}>{isProvince(region.id) ? 'CDN' : 'USD'}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  )
}

FuelPurchaseItem.propTypes = {
  createdAt: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
}

export default FuelPurchaseItem

// <Text>{row.region} {row.volume} L for ${row.total}</Text>
// <TouchableWithoutFeedback onPress={() => this.props.actions.removeFuelPurchase(row.id)}>
//   <Text>X</Text>
// </TouchableWithoutFeedback>