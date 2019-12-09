import { Alert } from 'react-native'
import {
   addNewProperty,
   updatePropertyDetails,
   setAllProperties,
} from '../properties/actions'
import { setAllItems } from '../inventory/actions'
import { setAllRequests } from '../requests/actions'
import { saveImageToCloudinary } from '../../utils/cloudinary'
import { updateObject } from '../../utils/reduxHelpers'

const addNewPropertyAPI = newProperty => async (
   dispatch,
   getState,
   { getFirestore },
) => {
   const firestore = getFirestore()
   const userEmail = getState().user.email
   try {
      // User Firestore reference
      const userRef = firestore.collection('users').doc(userEmail)

      // Save Image to Cloudinary -> Cloudinary Image URI
      const { uri, base64 } = newProperty.image
      let cloudinaryImageUri = await saveImageToCloudinary(base64, uri)
      let updatedImage = { local: uri, remote: cloudinaryImageUri }

      // Update newProperty with image data
      let newPropertyCopy = { ...newProperty }
      newPropertyCopy.image = updatedImage

      // Fetch Firestore properties data
      const propertiesData = await userRef.get().then(res => {
         let properties = {}
         const data = res.data()

         if (data && data.properties) {
            properties = { ...data.properties }
         }

         return properties
      })

      // Update Firestore data with new property
      const updatedProperties = updateObject(propertiesData, {
         [newPropertyCopy.id]: { ...newPropertyCopy },
      })

      // Save updated properties data to Firestore and redux
      userRef.update({ properties: { ...updatedProperties } })
      await dispatch(setAllProperties(updatedProperties))
   } catch (err) {
      const errorMessage = err.code
         ? err.message
         : 'There was a problem saving this property.'
      Alert.alert('Error', errorMessage)
      return false
   }
}

const updatePropertyDetailsAPI = (updates, identifier, idValue) => async (
   dispatch,
   getState,
) => {
   await dispatch(updatePropertyDetails(updates, identifier, idValue))
   const updatedStore = await getState()
   firestoreReduxSync(updatedStore.user.userID, { ...updatedStore })
}

const deletePropertyAPI = propertyId => async (
   dispatch,
   getState,
   { getFirestore },
) => {
   const firestore = getFirestore()
   const userEmail = getState().firebase.auth.email
   try {
      // User Firestore reference + data
      const userRef = firestore.collection('users').doc(userEmail)
      const { properties, inventory, requests } = await userRef
         .get()
         .then(res => {
            const data = res.data()

            if (data) {
               return {
                  properties: data.properties || {},
                  inventory: data.inventory || {},
                  requests: data.requests || {},
               }
            }
         })

      // Delete the selected property
      const updatedProperties = { ...properties }
      delete updatedProperties[propertyId]

      // Filter inventory to not include those with deleted property
      const updatedInventory = Object.values(inventory)
         .filter(item => item.property.id !== propertyId)
         .reduce((invObj, item) => {
            invObj[item.id] = item
            return invObj
         }, {})

      // Same with requests
      const updatedRequests = Object.values(requests)
         .filter(request => request.property.id !== propertyId)
         .reduce((reqObj, request) => {
            reqObj[request.id] = request
            return reqObj
         }, {})

      // Delete requests from root request collection
      const deleteRequests = Object.values(requests).filter(
         request => request.propertyId.id === propertyId,
      )
      deleteRequests.forEach(async request => {
         await firestore
            .collection('requests')
            .doc(request.id)
            .delete()
      })

      // Update the data in Firestore + local redux
      userRef.update({
         properties: { ...updatedProperties },
         inventory: { ...updatedInventory },
         requests: { ...updatedRequests },
      })
      await dispatch(setAllProperties(updatedProperties))
      await dispatch(setAllItems(updatedInventory))
      await dispatch(setAllRequests(updatedRequests))
   } catch (err) {
      const errorMessage = err.code
         ? err.message
         : 'There was a problem deleting your property.'
      Alert.alert('Error', errorMessage)
   }
}

export { addNewPropertyAPI, updatePropertyDetailsAPI, deletePropertyAPI }
