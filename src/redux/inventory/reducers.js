import {
   SET_ALL_ITEMS,
   ADD_NEW_ITEM,
   UPDATE_ITEM_DETAILS,
   DELETE_ITEM,
} from './actionTypes'
import {
   updateObject,
   addToArray,
   updateArrayObject,
   removeById,
} from '../../utils/reduxHelpers'

const initialState = {}

const inventoryReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_ALL_ITEMS:
         return action.array
      case ADD_NEW_ITEM:
         return addToArray(state, action.newItem)
      case UPDATE_ITEM_DETAILS:
         return updateArrayObject(
            state,
            action.updates,
            action.identifier,
            action.idValue,
         )
      case DELETE_ITEM:
         return removeById(state, action.idValue, action.identifier)
      default:
         return state
   }
}

export { inventoryReducer }
