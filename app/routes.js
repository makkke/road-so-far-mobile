import SplashScreen from './modules/app/SplashScreen'
import LoginScreen from './modules/auth/LoginScreen'
import FuelPurchasesScreen from './modules/fuelPurchases/FuelPurchasesScreen'
import CreateFuelPurchaseScreen from './modules/fuelPurchases/CreateFuelPurchaseScreen'

class Routes {
  get splashScreen() {
    return {
      component: SplashScreen,
    }
  }

  get loginScreen() {
    return {
      component: LoginScreen,
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
