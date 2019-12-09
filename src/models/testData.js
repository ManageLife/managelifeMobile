import { item } from './item'
import { room, property } from './property'

const itemsArray = [
   item({ name: 'Television', type: 'Electronics' }),
   item({ name: 'Coffee Table', type: 'Furniture' }),
   item({ name: 'Vizio TV', type: 'Electronics' }),
   item({ name: 'Fireplace', type: 'Decoration' }),
   item({ name: 'Lamp', type: 'Lighting' }),
   item({ name: 'Barstools', type: 'Furniture' }),
   item({ name: 'Picasso Painting', type: 'Decoration' }),
   item({ name: 'Couch', type: 'Furniture' }),
   item({ name: 'PS4', type: 'Electronics' }),
   item({ name: 'Xbox 360', type: 'Electronics' }),
]

const testRooms = () => {
   return [
      room({ name: 'Living Room', items: itemsArray }),
      room({ name: 'Foyer', items: itemsArray }),
   ]
}
export { testRooms }
