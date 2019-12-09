import React from 'react'
import { Alert } from 'react-native'
import RNActionButton from 'react-native-action-button'
import { Ionicons as Icon } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { COLORS, DEVICE } from '../../../../config'
import { styles } from './styles'
import { getAllUserDataAPI } from '../../../../redux/API/user'

let ActionButtons = ({
   openNewRequest,
   openNewProperty,
   openNewItem,
   propertiesLength,
   inventoryLength,
   getAllUserData,
}) => {
   return (
      <RNActionButton
         buttonColor={COLORS.RED}
         style={styles.container}
         offsetY={DEVICE.height * 0.08}
      >
         <RNActionButton.Item
            textContainerStyle={styles.textContainerStyle}
            onPress={() => {
               getAllUserData()
               openNewProperty()
            }}
            buttonColor={COLORS.PURPLE}
            title='New Property'
         >
            <Icon name='md-home' size={25} color={COLORS.WHITE} />
         </RNActionButton.Item>
         <RNActionButton.Item
            textContainerStyle={styles.textContainerStyle}
            onPress={() => {
               getAllUserData()
               propertiesLength
                  ? openNewItem()
                  : Alert.alert(
                       'No Properties',
                       'Add a property to begin adding inventory items.',
                    )
            }}
            buttonColor={COLORS.TURQUOISE}
            title='New Item'
         >
            <Icon name='md-create' size={25} color={COLORS.WHITE} />
         </RNActionButton.Item>
         <RNActionButton.Item
            textContainerStyle={styles.textContainerStyle}
            onPress={() => {
               getAllUserData()
               inventoryLength
                  ? openNewRequest()
                  : Alert.alert(
                       'No Items',
                       'Add inventory items to open a new request.',
                    )
            }}
            buttonColor={COLORS.GREEN}
            title='Service Request'
         >
            <Icon name='md-hammer' size={25} color={COLORS.WHITE} />
         </RNActionButton.Item>
         <RNActionButton.Item
            textContainerStyle={styles.textContainerStyle}
            onPress={() => {
               getAllUserData()
               Alert.alert(
                  'Feature coming soon!',
                  'Be on the lookout for more ManageLife features.',
               )
            }}
            buttonColor={COLORS.ORANGE}
            title='Product Request'
         >
            <Icon name='ios-cart' size={25} color={COLORS.WHITE} />
         </RNActionButton.Item>
      </RNActionButton>
   )
}

const mapStateToProps = state => ({
   propertiesLength: Object.keys(state.properties).length,
   inventoryLength: Object.keys(state.inventory).length,
})

const mapDispatchToProps = dispatch => ({
   getAllUserData: () => dispatch(getAllUserDataAPI()),
})

ActionButtons = connect(
   mapStateToProps,
   mapDispatchToProps,
)(ActionButtons)

export { ActionButtons }
