import { UPDATE_USER_INFO, FIRESTORE_SYNC, USER_LOGOUT } from './actionTypes'

const updateUserInfo = info => {
   return {
      type: UPDATE_USER_INFO,
      info,
   }
}

// Called when a user logs in or when redux store needs to sync with Firebase
const firestoreSync = state => {
   return {
      type: FIRESTORE_SYNC,
      state,
   }
}

const userLogout = () => {
   return {
      type: USER_LOGOUT,
   }
}

export { updateUserInfo, firestoreSync, userLogout }
