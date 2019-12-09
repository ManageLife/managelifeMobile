const member = ({
   id,
   firstName,
   lastName,
   address,
   city,
   state,
   zipcode,
   joined,
   propertiesOwned,
}) => {
   return {
      id: 'member_' + 'some_uuid',
      firstName: 'Monica',
      lastName: 'Smith',
      address: '123 Demo St',
      city: 'Austin',
      state: 'TX',
      zipcode: '70000',
      joined: new Date(),
      propertiesOwned: ['some_uuid', 'some_uuid', 'some_uuid'],
   }
}

export { member }
