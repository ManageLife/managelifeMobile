import React, { PureComponent } from 'react'
import {
   View,
   StyleSheet,
   Alert,
   Modal,
   TouchableOpacity as Button,
   TouchableHighlight,
   Text,
} from 'react-native'
import { connect } from 'react-redux'
import AutoHeightImage from 'react-native-auto-height-image'
import { Ionicons as Icon } from '@expo/vector-icons'
import { Page, HeaderText, SmallText, Card } from '../../../components'
import { item } from '../../../models'
import { capitalize } from '../../../utils'
import { deleteItemAPI } from '../../../redux/API/inventory'
import { Placeholder } from '../../../assets/png'
import { COLORS } from '../../../config'
import { styles } from './styles'

class InventoryDetails extends PureComponent {
   state = { modalVisible: false, modalImage: null }

   _handleModalToggle = data => {
      this.setState(prevState => ({
         modalVisible: !prevState.modalVisible,
         modalImage: data,
      }))
   }

   _deleteItem = (itemId, propertyId) => {
      const { navigation, deleteItem } = this.props
      const { goBack } = navigation

      Alert.alert(
         'Delete this item?',
         'This cannot be undone and will cancel any open requests for this item.',
         [
            {
               text: 'Cancel',
               onPress: () => console.log('Cancel Pressed'),
               style: 'cancel',
            },
            {
               text: 'Yes',
               onPress: () => {
                  deleteItem(itemId, propertyId)
                  goBack()
               },
            },
         ],
      )
   }

   render() {
      const { navigation } = this.props
      const { modalVisible, modalImage } = this.state
      const item = navigation.state.params // this.props
      const { goBack } = navigation
      const {
         name,
         brand,
         serialNumber,
         modelNumber,
         color: uncapitalizedColor,
         image: imageData,
         id,
         property,
      } = item
      let color = uncapitalizedColor
         ? capitalize(uncapitalizedColor)
         : uncapitalizedColor
      const { local, remote } = imageData

      let image = null

      if (local) {
         image = { uri: local }
      } else if (remote) {
         image = { uri: remote }
      }

      return (
         <Page
            title='Details'
            headerType='item'
            scrollview
            onPressIconLeft={() => goBack()}
            onPressIconRight={() => this._deleteItem(id, property.id)}
            style={styles.pageContainer}
         >
            <Card style={styles.detailsCard}>
               <Field title='Item' data={name} />
               <Field title='Brand' data={brand} />
               <Field
                  onPress={() => this._handleModalToggle(serialNumber)}
                  title='Serial Number'
                  data={serialNumber}
               />
               <Field
                  onPress={() => this._handleModalToggle(modelNumber)}
                  title='Model Number'
                  data={modelNumber}
               />
               <Field title='Color' data={color} />
            </Card>
            <View style={styles.imageContainer}>
               <AutoHeightImage width={320} source={image || Placeholder} />
            </View>
            <Button
               onPress={() => navigation.navigate('NewRequest', item)}
               style={styles.button}
            >
               <Text style={styles.buttonText}> Report Problem</Text>
            </Button>
            <Modal visible={modalVisible} animationType='slide'>
               <Page
                  style={styles.modal}
                  headerType='modal'
                  onPressIcon={() => this.setState({ modalVisible: false })}
               >
                  <AutoHeightImage
                     width={320}
                     source={
                        modalImage ? { uri: modalImage.local } : Placeholder
                     }
                     fallbackSource={
                        modalImage ? { uri: modalImage.remote } : Placeholder
                     }
                  />
               </Page>
            </Modal>
         </Page>
      )
   }
}

const Field = ({ title, data, onPress }) => {
   let dataInfo

   if (data && data.local) {
      dataInfo = 'Photo'
   } else if (data && !data.local) {
      dataInfo = data
   } else {
      dataInfo = 'N/A'
   }

   return (
      <View style={styles.fieldContainer}>
         <SmallText bold style={styles.fieldTitle}>
            {title}:{' '}
         </SmallText>
         <TouchableHighlight
            onPress={() => {
               if (dataInfo === 'Photo') {
                  onPress(data.local || data.remote)
               }
            }}
         >
            <SmallText
               color={dataInfo === 'Photo' ? COLORS.SECONDARY : COLORS.BLACK}
            >
               {dataInfo}
            </SmallText>
         </TouchableHighlight>
      </View>
   )
}

const mapStateToProps = state => ({
   properties: state.properties,
})

const mapDispatchToProps = dispatch => ({
   addNewProperty: newProperty => dispatch(addNewProperty(newProperty)),
   deleteItem: (itemId, propertyId) =>
      dispatch(deleteItemAPI(itemId, propertyId)),
})

InventoryDetails = connect(
   mapStateToProps,
   mapDispatchToProps,
)(InventoryDetails)

export { InventoryDetails }
