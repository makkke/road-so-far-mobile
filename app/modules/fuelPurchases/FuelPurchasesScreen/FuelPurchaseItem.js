import React, { PropTypes } from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'

import { regions, isProvince } from '../../../utils/data'

const styles = StyleSheet.create({
  root: {
    paddingVertical: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 2,
    shadowColor: '#2b2f51',
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 4,
  },
  date: {
    width: 20,
    flex: 1,
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
  quantityIntegerText: {
    fontSize: 18,
    color: '#829efe',
    fontFamily: 'avenir',
  },
  quantityFractionalText: {
    fontSize: 14,
    color: '#829efe',
    fontFamily: 'avenir',
  },
  quantityUnit: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'avenir',
  },
  amount: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    width: 65,
  },
  amountIntegerText: {
    fontSize: 20,
    color: '#53cae3',
    fontFamily: 'avenir',
  },
  amountFractionalText: {
    marginLeft: 3,
    marginTop: 2,
    fontSize: 10,
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
  const { createdAt, location } = props
  const date = new Date(createdAt)
  const region = regions.find(x => x.id === location.region)

  const quantity = {
    integerPart: Math.floor(props.quantity),
    fractionalPart: (props.quantity % 1).toFixed(3).substring(1),
  }
  const amount = {
    integerPart: Math.floor(props.amount),
    fractionalPart: (props.amount % 1).toFixed(2).substring(2),
  }

  return (
    <TouchableHighlight>
      <View>
        <View style={styles.root}>
          <View style={styles.top}>
            <View style={styles.date}>
              <Text style={styles.dateDay}>{date.getDate()}</Text>
            </View>
            <View style={styles.location}>
              <Text style={styles.locationCity}>{location.city}</Text>
            </View>
            <View style={styles.quantity}>
              <Text>
                <Text style={styles.quantityIntegerText}>{quantity.integerPart}</Text>
                <Text style={styles.quantityFractionalText}>{quantity.fractionalPart}</Text>
              </Text>
            </View>
            <View style={styles.amount}>
              <View>
                <Text style={styles.amountIntegerText}>${amount.integerPart}</Text>
              </View>
              <View style={styles.amountFractionalPart}>
                <Text style={styles.amountFractionalText}>{amount.fractionalPart}</Text>
              </View>
            </View>
          </View>
          <View style={styles.bottom}>
            <View style={styles.date}>
              <Text style={styles.dateMonth}>{months[date.getMonth()].toUpperCase()}</Text>
            </View>
            <View style={styles.location}>
              <Text style={styles.locationRegion}>{region.name}, {location.region.toUpperCase()}</Text>
            </View>
            <View style={styles.quantity}>
              <Text style={styles.quantityUnit}>{isProvince(region.id) ? 'LTR' : 'GAL'}</Text>
            </View>
            <View style={styles.amount}>
              <Text style={styles.amountUnit}>{isProvince(region.id) ? 'CDN' : 'USD'}</Text>
            </View>
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