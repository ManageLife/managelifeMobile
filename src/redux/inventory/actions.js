import {
   SET_ALL_ITEMS,
   ADD_NEW_ITEM,
   UPDATE_ITEM_DETAILS,
   DELETE_ITEM,
} from './actionTypes'

const setAllItems = array => {
   return {
      type: SET_ALL_ITEMS,
      array,
   }
}

const addNewItem = newItem => {
   return {
      type: ADD_NEW_ITEM,
      newItem: {
         ...newItem,
      },
   }
}

const updateItemDetails = (updates, identifier, idValue) => {
   return {
      type: UPDATE_ITEM_DETAILS,
      updates,
      identifier,
      idValue,
   }
}

const deleteItem = (idValue, identifier) => {
   return {
      type: DELETE_ITEM,
      idValue,
      identifier,
   }
}

export { setAllItems, addNewItem, updateItemDetails, deleteItem }
