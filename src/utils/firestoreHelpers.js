import firebase from 'firebase'
import 'firebase/firestore'
import axios from 'axios'
import moment from 'moment'

const firebaseConfig = {
   apiKey: 'AIzaSyBTFQj3lc03w1rkECZYcmX2iyd8DuSXwBg',
   authDomain: 'managelife-3b024.firebaseapp.com',
   databaseURL: 'https://managelife-3b024.firebaseio.com',
   projectId: 'managelife-3b024',
   storageBucket: 'managelife-3b024.appspot.com',
   messagingSenderId: '252977322024',
   appID: '1:252977322024:web:c69f587cd320bb989a7d1d',
}

// Updates user Firestore data with whatever is stored in redux
const firestoreReduxSync = async (userID, data) => {
   await delete data._persist
   if (!firebase.apps.length) {
      await firebase.initializeApp(firebaseConfig)
      console.log(firebase.apps.length)
   }
   firebase
      .firestore()
      .collection('users')
      .doc(userID)
      .set(data)
      .then(res => console.log(res))
}

const sendRequestEmail = info => {
   axios
      .post(
         'https://us-central1-managelife-3b024.cloudfunctions.net/emailMessage',
         {
            email: info.email,
            username: info.username,
            phoneNumber: info.phoneNumber,
            property: info.property,
            item: info.item,
            address: info.address,
            room: info.room,
            description: info.description,
            time: info.time,
            requestID: info.requestID,
         },
      )
      .then(res => console.log(res))
      .catch(res => console.log(res))
}

export { firebaseConfig, firestoreReduxSync, sendRequestEmail }
