// USING FIREBASE WITH EXPO
// https://docs.expo.io/versions/v34.0.0/guides/using-firebase/
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { ENV } from '../../../environment'

const envType = 'dev'

const firebaseConfig = {
   apiKey: ENV[envType].REACT_APP_FIREBASE_API_KEY,
   authDomain: ENV[envType].REACT_APP_FIREBASE_AUTH_DOMAIN,
   databaseURL: ENV[envType].REACT_APP_FIREBASE_DATABASE_URL,
   projectId: ENV[envType].REACT_APP_FIREBASE_PROJECT_ID,
   storageBucket: ENV[envType].REACT_APP_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: ENV[envType].REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
   appID: ENV[envType].REACT_APP_FIREBASE_APP_ID,
}

try {
   firebase.initializeApp(firebaseConfig)
   firebase.firestore()
   console.log('Firebase Initialized')
} catch (err) {
   console.error(err)
}

// React-redux-firebase config for rrfProps -> redux/store.js
const rrfConfig = {
   userProfile: 'users',
   useFirestoreForProfile: true,
}

export { firebase, rrfConfig }
