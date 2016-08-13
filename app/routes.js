import SplashScreen from './modules/app/SplashScreen'
import LoginScreen from './modules/auth/LoginScreen'
import FuelPurchasesScreen from './modules/fuelPurchases/FuelPurchasesScreen'
// import WinScreen from './modules/game/WinScreen'

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
      title: 'Fuel Purchases',
      component: FuelPurchasesScreen,
    }
  }

  // get winScreen() {
  //   return {
  //     component: WinScreen,
  //   }
  // }
}

export default new Routes()
