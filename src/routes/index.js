import {
   createDrawerNavigator,
   createAppContainer,
   createStackNavigator,
} from 'react-navigation'
import { COLORS } from '../config'
import {
   AuthLoading,
   Login,
   Feed,
   Properties,
   Inventory as InventoryList,
   InventoryDetails,
   Settings,
   NewProperty,
   NewItem,
   NewRequest,
} from '../pages'

const Inventory = createStackNavigator(
   {
      InventoryList,
      InventoryDetails,
   },
   {
      headerMode: 'none',
   },
)

const DrawerNavigator = createDrawerNavigator(
   {
      Feed,
      Properties,
      Inventory,
      Settings,
   },
   {
      initialRouteName: 'Feed',
      hideStatusBar: true,
      drawerBackgroundColor: 'rgba(255,255,255,.9)',
      contentOptions: {
         activeTintColor: '#fff',
         activeBackgroundColor: COLORS.SECONDARY,
      },
   },
)

const AppNavigator = createAppContainer(
   createStackNavigator(
      {
         AuthLoading,
         Login,
         Main: DrawerNavigator,
         Inventory,
         InventoryDetails,
         NewProperty,
         NewItem,
         NewRequest,
      },
      {
         initialRouteName: 'AuthLoading',
         headerMode: 'none',
      },
   ),
)

export { AppNavigator }
