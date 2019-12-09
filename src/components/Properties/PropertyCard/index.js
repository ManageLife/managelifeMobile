import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { Ionicons as Icon } from '@expo/vector-icons'
import { Card, SubheaderText, SmallText, PopupMenu } from '../../resusable'
import { COLORS } from '../../../config'
import { styles } from './styles'

const PropertyCard = ({
   onPress,
   editProperty,
   deleteProperty,
   name,
   address1,
   address2,
   city,
   zipcode,
   state,
   country,
   imageSource,
   requestTotal,
   inventoryTotal,
}) => (
   <Card style={styles.container}>
      <View style={styles.popupMenu}>
         <PopupMenu
            remove
            menuItems={[
               // { title: 'Change Info', onSelect: editProperty },
               {
                  title: 'REMOVE',
                  color: COLORS.WARNING_RED,
                  onSelect: deleteProperty,
               },
            ]}
         />
      </View>
      <TouchableOpacity style={styles.upperRow} onPress={onPress}>
         <View style={styles.imageContainer}>
            {imageSource ? (
               <Image
                  source={imageSource}
                  style={styles.image}
                  resizeMode='contain'
               />
            ) : (
               <View style={styles.placeholderContainer}>
                  <Icon color={COLORS.PRIMARY} size={75} name='ios-home' />
               </View>
            )}
         </View>
         <View style={styles.contentContainer}>
            <SubheaderText>{name}</SubheaderText>
            <SmallText>{address1}</SmallText>
            {address2 && <SmallText>{address2}</SmallText>}
            <SmallText>
               {city}, {state} {zipcode}
            </SmallText>
         </View>
      </TouchableOpacity>
      <View style={styles.lowerRow}>
         <View style={styles.lowersubContainer}>
            <SmallText>Inventory: {inventoryTotal}</SmallText>
         </View>
         <View style={styles.lowersubContainer}>
            <SmallText>Requests: {requestTotal}</SmallText>
         </View>
      </View>
   </Card>
)

export { PropertyCard }
