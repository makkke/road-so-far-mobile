import { combineReducers } from 'redux'

import app from './modules/app/appReducer'
import auth from './modules/auth/auth.module'
import fuelPurchases from './modules/fuelPurchases/fuelPurchases.module'

export default combineReducers({
  app,
  auth,
  fuelPurchases,
})
