import { UPDATE_USER_INFO } from './actionTypes'
import { updateObject } from '../../utils/reduxHelpers'

const initialState = {
   firstName: '',
   lastName: '',
   email: '',
   phoneNumber: '',
   itemCategories: ['Appliances', 'Electronics', 'Furniture', 'Tools'],
   userID: null,
}

const userReducer = (state = initialState, action) => {
   switch (action.type) {
      case UPDATE_USER_INFO:
         return updateObject(state, action.info)
      default:
         return state
   }
}

export { userReducer }
