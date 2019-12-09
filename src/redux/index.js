// Redux (local) actions
export { updateUserInfo, userLogout } from './user/actions'
export {
   addNewProperty,
   updatePropertyDetails,
   deleteProperty,
   addNewRoom,
} from './properties/actions'
export {
   addNewRequest,
   updateRequestDetails,
   deleteRequest,
} from './requests/actions'
export { addNewItem, updateItemDetails, deleteItem } from './inventory/actions'

//API actions
export {
   createNewUserAPI,
   updateUserInfoAPI,
   loginUserAPI,
   logoutUserAPI,
   addNewPropertyAPI,
   updatePropertyDetailsAPI,
   deletePropertyAPI,
   addNewItemAPI,
   updateItemDetailsAPI,
   deleteItemAPI,
   addNewRequestAPI,
   updateRequestDetailsAPI,
   deleteRequestAPI,
} from './API'
