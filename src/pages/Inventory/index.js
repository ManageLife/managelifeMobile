import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Page, SubheaderText, RoomInventory, Card } from '../../components'
import { COLORS } from '../../config'
import { styles } from './styles'

class Inventory extends PureComponent {
   _createInventoryLists = properties => {
      return properties.reduce((rootObj, property) => {
         rootObj[property.name] = property.rooms.map(room => {
            const obj = {
               title: room,
               inventory: [],
            }
            return obj
         })

         return rootObj
      }, {})
   }

   _sortInventoryByProperty = (properties, inventory) => {
      const inventoryObj = this._createInventoryLists(properties)
      inventory.forEach(item => {
         const objIndex = inventoryObj[item.property.name].findIndex(
            roomObj => {
               return roomObj.title === item.room
            },
         )
         inventoryObj[item.property.name][objIndex].inventory.push(item)
      })

      return inventoryObj
   }

   _displayInventory = () => {
      const { properties, inventory, navigation } = this.props
      const { navigate } = navigation
      const selectedProperty = navigation.state.params

      let sections
      let displayComponent = null
      if (inventory && properties && inventory.length !== 0) {
         sections = this._sortInventoryByProperty(properties, inventory)
         displayComponent = selectedProperty ? (
            <RoomInventory
               header={selectedProperty.name}
               sections={sections[selectedProperty]}
               navigate={navigate}
            />
         ) : (
            Object.keys(sections).map((property, index) => (
               <View
                  style={index !== 0 ? styles.inventoryContainer : null}
                  key={property}
               >
                  <RoomInventory
                     header={property}
                     sections={sections[property]}
                     navigate={navigate}
                  />
               </View>
            ))
         )
      }

      return displayComponent
   }

   render() {
      const { inventory, properties } = this.props

      return (
         <Page
            title='Inventory'
            headerType='drawer'
            scrollview
            actionButtons
            style={styles.container}
         >
            {inventory.length && properties.length ? (
               this._displayInventory()
            ) : (
               <Card style={styles.placeholderCard}>
                  <SubheaderText
                     bold
                     textAlign='center'
                     lineHeight={30}
                     color={COLORS.SECONDARY}
                  >
                     Tap the action button to start adding items!
                  </SubheaderText>
               </Card>
            )}
         </Page>
      )
   }
}

const mapStateToProps = state => {
   return {
      userEmail: state.user.email,
      properties: Object.values(state.properties) || [],
      inventory: Object.values(state.inventory) || [],
   }
}

const mapDispatchToProps = dispatch => ({
   addNewRoom: (propertyName, roomName) =>
      dispatch(addNewRoom(propertyName, roomName)),
   addNewItem: newItem => dispatch(addNewItem(newItem)),
})

Inventory = compose(
   connect(
      mapStateToProps,
      mapDispatchToProps,
   ),
)(Inventory)

export { Inventory }
export { InventoryDetails } from './InventoryDetails'
