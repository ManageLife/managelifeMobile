import {
   SET_ALL_PROPERTIES,
   ADD_NEW_PROPERTY,
   UPDATE_PROPERTY_DETAILS,
   DELETE_PROPERTY,
   ADD_NEW_ROOM,
} from './actionTypes'
import {
   updateObject,
   addToArray,
   updateArrayObject,
   removeById,
   updateNestedArray,
} from '../../utils/reduxHelpers'

const initialState = {}

const propertiesReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_ALL_PROPERTIES:
         return action.array
      case ADD_NEW_PROPERTY:
         return updateObject(state, action.newProperty)
      case UPDATE_PROPERTY_DETAILS:
         return updateArrayObject(
            state,
            action.updates,
            action.identifier,
            action.idValue,
         )
      case DELETE_PROPERTY:
         return removeById(state, action.idValue, action.identifier)
      case ADD_NEW_ROOM:
         return updateNestedArray(
            state,
            'name',
            action.propertyName,
            'add',
            'rooms',
            action.roomName,
         )
      default:
         return state
   }
}

export { propertiesReducer }
