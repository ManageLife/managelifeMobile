const item = ({
   id,
   associatedProperty,
   associatedRoom,
   type,
   name,
   brand,
   serialNumber,
   modelNumber,
   color,
   cost,
   nextServiceDate,
   serviceHistory,
   expirationDate,
   amount,
   energyUsage,
   replaceables,
}) => {
   return {
      id: id || `item_${'some_uuid'}`,
      associatedProperty: associatedProperty || `room_${'some_propertyid'}`,
      associatedRoom: associatedRoom || `room_${'some_uuid'}`,
      type: type || 'electronics',
      name: name || 'Television',
      brand: brand || 'Insignia',
      serialNumber: serialNumber || '543EVCDAA45',
      modelNumber: modelNumber || '23456U8G99A',
      color: color || 'black',
      cost: cost || 900,
      nextServiceDate: nextServiceDate || null,
      serviceHistory: serviceHistory || [{}, {}], // history of requests and actions
      expirationDate: expirationDate || null,
      amount: amount || 1,
      energyUsage: energyUsage || 0,
      replaceables:
         replaceables ||
         {
            // e.g., filters
         },
   }
}

export { item }
