import {
   SET_ALL_REQUESTS,
   ADD_NEW_REQUEST,
   UPDATE_REQUEST_DETAILS,
   DELETE_REQUEST,
} from './actionTypes'

const setAllRequests = array => {
   return {
      type: SET_ALL_REQUESTS,
      array,
   }
}

const addNewRequest = newRequest => {
   return {
      type: ADD_NEW_REQUEST,
      newRequest: {
         ...newRequest,
      },
   }
}

const updateRequestDetails = (updates, identifier, idValue) => {
   return {
      type: UPDATE_REQUEST_DETAILS,
      updates,
      identifier,
      idValue,
   }
}

const deleteRequest = (idValue, identifier) => {
   return {
      type: DELETE_REQUEST,
      idValue,
      identifier,
   }
}

export { setAllRequests, addNewRequest, updateRequestDetails, deleteRequest }
