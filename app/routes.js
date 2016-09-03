import SplashScreen from './modules/app/SplashScreen'
import SigninScreen from './modules/auth/SigninScreen'
import SignupScreen from './modules/auth/SignupScreen'
import FuelPurchasesScreen from './modules/fuelPurchases/FuelPurchasesScreen'
import CreateFuelPurchaseScreen from './modules/fuelPurchases/CreateFuelPurchaseScreen'

class Routes {
  get splashScreen() {
    return {
      component: SplashScreen,
    }
  }

  get signinScreen() {
    return {
      component: SigninScreen,
    }
  }

  get signupScreen() {
    return {
      component: SignupScreen,
    }
  }

  get fuelPurchasesScreen() {
    return {
      component: FuelPurchasesScreen,
    }
  }

  get createFuelPurchaseScreen() {
    return {
      component: CreateFuelPurchaseScreen,
    }
  }
}

export default new Routes()
