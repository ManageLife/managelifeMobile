import React, { PureComponent } from 'react'
import { Alert } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { deletePropertyAPI } from '../../redux/API/properties'
import { Page, PropertyCard, SubheaderText, Card } from '../../components'
import { COLORS } from '../../config'
import { styles } from './styles'

class Properties extends PureComponent {
   state = {
      requestTotals: {},
      inventoryTotals: {},
   }

   _deleteProperty = propertyId => {
      const { deleteProperty } = this.props

      Alert.alert(
         'Delete this property?',
         'This cannot be undone and will delete any inventory and requests associated with this property.',
         [
            {
               text: 'Cancel',
               style: 'cancel',
            },
            {
               text: 'Yes',
               onPress: () => deleteProperty(propertyId),
            },
         ],
      )
   }

   render() {
      const { navigation, properties } = this.props

      return (
         <Page
            title='Properties'
            headerType='drawer'
            style={styles.container}
            scrollview
            actionButtons
         >
            {properties.length ? (
               properties.map((property, index) => {
                  const { local, remote } = property.image
                  let image = null
                  if (local) {
                     image = { uri: local }
                  } else if (remote) {
                     image = { uri: remote }
                  }

                  return (
                     <PropertyCard
                        key={`${property.name}_${index}`}
                        onPress={() => {
                           navigation.navigate('Inventory', { ...property })
                        }}
                        deleteProperty={() => this._deleteProperty(property.id)}
                        name={property.name}
                        address1={property.address1}
                        address2={property.address2}
                        city={property.city}
                        state={property.state}
                        zipcode={property.zipcode}
                        imageSource={image}
                        inventoryTotal={property.inventoryTotal}
                        requestTotal={property.requestTotal}
                     />
                  )
               })
            ) : (
               <Card style={styles.placeholderCard}>
                  <SubheaderText
                     textAlign='center'
                     lineHeight={30}
                     color={COLORS.SECONDARY}
                     bold
                  >
                     Tap the action button to add your first property!
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
      requests: Object.values(state.requests) || [],
   }
}

const mapDispatchToProps = dispatch => ({
   addNewProperty: newProperty => dispatch(addNewProperty(newProperty)),
   deleteProperty: propertyId => dispatch(deletePropertyAPI(propertyId)),
})

Properties = compose(
   connect(
      mapStateToProps,
      mapDispatchToProps,
   ),
)(Properties)

export { Properties }
