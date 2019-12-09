import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Ionicons as Icon } from '@expo/vector-icons'
import { SubheaderText } from '../../resusable'
import { FeedCard } from '../FeedCard'
import { COLORS } from '../../../config'
import { styles } from './styles'

const RequestsList = ({ requestInfo, navigation }) => {
   const { navigate } = navigation

   if (requestInfo) {
      return (
         <View>
            <TouchableOpacity
               onPress={() => navigate('Properties')}
               style={styles.titleContainer}
            >
               <Icon
                  name='ios-home'
                  size={30}
                  color={COLORS.SECONDARY}
                  style={{ marginRight: 10 }}
               />
               <SubheaderText bold color={COLORS.SECONDARY}>
                  Properties
               </SubheaderText>
            </TouchableOpacity>
            {requestInfo.map((propertyRequests, index) => (
               <View
                  style={index !== 0 ? styles.wrapper : null}
                  key={`${propertyRequests.propertyName}${index}`}
               >
                  <FeedCard
                     header={propertyRequests.propertyName}
                     sections={
                        propertyRequests.requests.length
                           ? propertyRequests.requests
                           : null
                     }
                     noBold
                  />
               </View>
            ))}
         </View>
      )
   }
   return (
      <FeedCard
         onPressHeader={() => navigate('Properties')}
         header='Properties'
         iconName='ios-home'
      />
   )
}

export { RequestsList }
