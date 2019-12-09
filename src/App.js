import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { MenuProvider } from 'react-native-popup-menu'
import * as Font from 'expo-font'
import Constants from 'expo-constants'
import { AppNavigator } from './routes'
import { store, persistor } from './redux/store'
import { getEnvVars } from '../environment'

class App extends PureComponent {
   state = { loading: true }
   async componentDidMount() {
      await Font.loadAsync({
         Roboto: require('./assets/fonts/Roboto.ttf'),
         RobotoBold: require('./assets/fonts/RobotoBold.ttf'),
         OpenSans: require('./assets/fonts/OpenSans.ttf'),
      })
      this.setState({ loading: false })
   }

   render() {
      const { loading } = this.state

      if (loading) {
         return <View />
      }
      // Only logs if 'development'
      console.log('Process.env.NODE_ENV: ', process.env.NODE_ENV)
      return (
         <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
               <MenuProvider>
                  <AppNavigator />
               </MenuProvider>
            </PersistGate>
         </Provider>
      )
   }
}

export { App }
