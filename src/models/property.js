const property = ({ id, name, address, city, state, zipcode, rooms }) => {
   return {
      id: 'property_' + 'some_uuid',
      name: 'Main House',
      address: '123 Demo St',
      city: 'Austin',
      state: 'TX',
      zipcode: '70000',
      rooms: ['Living Room', 'Foyer', 'Bedroom'],
   }
}

const room = ({ id, name, items }) => {
   return {
      id: id || `room_${'some_uuid'}`,
      name: name || 'Living Room',
      items: items || ['item_some_uuid', 'item_some_uuid', 'item_some_uuid'],
   }
}
export { property, room }
