const updateObject = (initialState, payload) => {
   return Object.assign({}, initialState, payload)
}

// Appends an item to the end of an array
const addToArray = (initialArray, newItem) => {
   const newState = initialArray.slice()
   newState.push(newItem)
   return newState
}

// Updates an array using splice
const updateArray = (initialArray, itemId, newItem) => {
   const newState = initialArray.slice()
   const itemIndex = initialArray.indexOf(itemId)

   newState.splice(itemIndex, 1, newItem)
   return newState
}

// Removes an item from the end of an array
const removeFromArray = initialArray => {
   const newState = initialArray.slice()
   newState.pop()
   return newState
}

// Removes an item from an array by id; use 'identifier' for arrays of objects
const removeById = (initialArray, idValue, identifier) => {
   const newState = initialArray.filter(item => {
      if (identifier && item[identifier] === idValue) {
         return false
      } else if (!identifier && item === idValue) {
         return false
      }
      return true
   })

   return newState
}

// Updates an object in an array
const updateArrayObject = (initialArray, updates, identifier, idValue) => {
   const newState = initialArray.map(item => {
      if (item[identifier] === idValue) {
         return {
            ...item,
            ...updates,
         }
      }

      return item
   })

   return newState
}

// Updates an array nested in an array of objects
const updateNestedArray = (
   initialRootArray,
   rootIdentifier,
   rootIdValue,
   editType,
   arrayIdentifier,
   itemId,
) => {
   const rootObject = initialRootArray.filter(
      item => item[rootIdentifier] === rootIdValue,
   )[0]
   const initialArray = rootObject[arrayIdentifier].slice()
   let newArray

   if (editType === 'delete') {
      newArray = removeById(initialArray, itemId)
   } else if (editType === 'add') {
      newArray = addToArray(initialArray, itemId)
   } else if (editType === 'update') {
      newArray = updateArray(initialArray, itemId.old, itemId.new)
   }

   const newState = updateArrayObject(
      initialRootArray,
      { [arrayIdentifier]: newArray },
      rootIdentifier,
      rootIdValue,
   )
   return newState
}

export {
   updateObject,
   addToArray,
   updateArray,
   removeFromArray,
   removeById,
   updateArrayObject,
   updateNestedArray,
}
