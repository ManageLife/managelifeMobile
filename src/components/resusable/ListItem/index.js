import React from 'react'
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Ionicons as Icon } from '@expo/vector-icons'
import { SmallText } from '../Text'
import { COLORS } from '../../../config'
//import { styles } from './styles'

const ListItem = ({ item, navigate }) => {
   return (
      <TouchableOpacity
         style={styles.itemContainer}
         onPress={() => navigate(`InventoryDetails`, item)}
      >
         <SmallText style={styles.itemText}>
            {item.name} {item.type && `(${item.type})`}
         </SmallText>
         <Icon size={25} color={COLORS.GRAY} name='ios-arrow-forward' />
      </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
   itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '14.5%',
      backgroundColor: COLORS.WHITE,
      paddingRight: '2%',
      paddingLeft: '2%',
      borderWidth: 1,
      borderColor: COLORS.GRAY,
   },
   itemText: {
      fontFamily: 'Roboto',
      fontSize: 20,
      color: COLORS.GRAY,
      paddingTop: '2%',
   },
})
export { ListItem }
