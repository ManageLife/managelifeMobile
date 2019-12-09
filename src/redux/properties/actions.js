import {
   SET_ALL_PROPERTIES,
   ADD_NEW_PROPERTY,
   UPDATE_PROPERTY_DETAILS,
   DELETE_PROPERTY,
   ADD_NEW_ROOM,
} from './actionTypes'

const setAllProperties = array => {
   return {
      type: SET_ALL_PROPERTIES,
      array,
   }
}

const addNewProperty = newProperty => {
   return {
      type: ADD_NEW_PROPERTY,
      newProperty: {
         [newProperty.id]: newProperty,
      },
   }
}

const updatePropertyDetails = (updates, identifier, idValue) => {
   return {
      type: UPDATE_PROPERTY_DETAILS,
      updates,
      identifier,
      idValue,
   }
}

const deleteProperty = (idValue, identifier) => {
   return {
      type: DELETE_PROPERTY,
      idValue,
      identifier,
   }
}

const addNewRoom = (propertyName, roomName) => {
   return {
      type: ADD_NEW_ROOM,
      propertyName,
      roomName,
   }
}

export {
   setAllProperties,
   addNewProperty,
   updatePropertyDetails,
   deleteProperty,
   addNewRoom,
}
