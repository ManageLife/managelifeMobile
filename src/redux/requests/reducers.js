import {
   SET_ALL_REQUESTS,
   ADD_NEW_REQUEST,
   UPDATE_REQUEST_DETAILS,
   DELETE_REQUEST,
} from './actionTypes'
import {
   updateObject,
   addToArray,
   updateArrayObject,
   removeById,
} from '../../utils/reduxHelpers'

const initialState = {}

const requestsReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_ALL_REQUESTS:
         return action.array
      case ADD_NEW_REQUEST:
         return addToArray(state, action.newRequest)
      case UPDATE_REQUEST_DETAILS:
         return updateArrayObject(
            state,
            action.updates,
            action.identifier,
            action.idValue,
         )
      case DELETE_REQUEST:
         return removeById(state, action.idValue, action.identifier)
      default:
         return state
   }
}

export { requestsReducer }
