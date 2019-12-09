import firebase from 'firebase'
import 'firebase/storage'
import { firebaseConfig } from './firestoreHelpers'

const uploadImageFirebaseStorage = async (userID, imageID, imageData) => {
   if (!firebase.apps.length) {
      await firebase.initializeApp(firebaseConfig)
   }

   const storageRef = firebase.storage().ref()
   const imageRef = storageRef.child(`userImages/${userID + imageID}`)

   imageRef.putString(imageData, 'base64').then(res => console.log(res))
}

export { uploadImageFirebaseStorage }
