import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import { updateObject } from '../utils/reduxHelpers'
import { /* FIRESTORE_SYNC, */ USER_LOGOUT } from './user/actionTypes'
import { userReducer } from './user/reducers'
import { propertiesReducer } from './properties/reducers'
import { inventoryReducer } from './inventory/reducers'
import { requestsReducer } from './requests/reducers'

// Root reducer
const appReducer = combineReducers({
   user: userReducer,
   properties: propertiesReducer,
   inventory: inventoryReducer,
   requests: requestsReducer,
   firebase: firebaseReducer,
   firestore: firestoreReducer,
})

// Configure redux-persist; if USER_LOGOUT is called, the store is purged
const rootReducer = (state, action) => {
   switch (action.type) {
      //case FIRESTORE_SYNC:
      //return updateObject(state, action.state)
      case USER_LOGOUT:
         storage.removeItem('persist:root')
         state = undefined
      default:
         return appReducer(state, action)
   }
}

export { rootReducer }
