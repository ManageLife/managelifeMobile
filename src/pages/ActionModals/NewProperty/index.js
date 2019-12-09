import React, { PureComponent } from 'react'
import { View, Alert } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { connect } from 'react-redux'
import { addNewPropertyAPI, deletePropertyAPI } from '../../../redux'
import { getAllUserDataAPI } from '../../../redux/API/user'
import { generateUniqueID } from '../../../utils'
import {
   Page,
   Input,
   ImagePicker,
   RoundIconButton,
   SmallText,
   Button,
} from '../../../components'
import { COLORS, DEVICE, SPACING } from '../../../config'
import { styles } from './styles'

class NewProperty extends PureComponent {
   componentDidMount() {
      const { getAllUserData } = this.props
      getAllUserData()
   }
   state = {
      info: {
         name: null,
         address1: null,
         address2: null,
         city: null,
         zipcode: null,
         state: null,
         country: null,
         image: { uri: null, base64: null },
      },
      rooms: {
         room1: { key: 'room1', name: 'Bedroom 1' },
         room2: { key: 'room2', name: 'Bedroom 2' },
         room3: { key: 'room3', name: 'Bedroom 3' },
         room4: { key: 'room4', name: 'Bathroom' },
         room5: { key: 'room5', name: 'Kitchen' },
         room6: { key: 'room6', name: 'Living Room' },
         room8: { key: 'room8', name: 'Utility' },
         room9: { key: 'room9', name: 'Garage' },
      },
      isUploading: false,
   }

   _onChangeText = (text, type) => {
      this.setState(prevState => ({
         info: { ...prevState.info, [type]: text },
      }))
   }

   _onChangePhoto = imageData => {
      this.setState(prevState => ({
         info: { ...prevState.info, image: imageData },
      }))
   }

   _editRooms = async (text, roomKey) => {
      const roomInfo = await { name: text, key: roomKey }
      this.setState(prevState => ({
         rooms: { ...prevState.rooms, [roomKey]: roomInfo },
      }))
   }

   _addRoom = () => {
      const { rooms } = this.state
      const roomsLength = Object.keys(rooms).length
      const roomKey = `room${roomsLength + 1}`

      const newRoom = { key: roomKey, name: '' }

      this.setState(prevState => ({
         rooms: { ...prevState.rooms, [roomKey]: newRoom },
      }))
   }

   _deleteRoom = roomKey => {
      Alert.alert('Delete this room?', null, [
         {
            text: 'Cancel',
            style: 'cancel',
         },
         {
            text: 'Delete',
            onPress: () => {
               const { rooms } = this.state
               delete rooms[roomKey]

               this.setState(prevState => ({
                  info: { ...prevState.info, rooms },
               }))
            },
         },
      ])
   }

   _sortRooms = (roomA, roomB) => {
      if (roomA.key < roomB.key) {
         return -1
      }
      if (roomA.key > roomB.key) {
         return 1
      }
      return 0
   }

   _navigateBack = () => {
      const { goBack } = this.props.navigation
      goBack()
   }

   _validation = () => {
      const { info, rooms } = this.state

      const requiredInfo = [
         { value: 'name', display: 'Name' },
         { value: 'address1', display: 'Address1' },
         { value: 'city', display: 'City' },
         { value: 'zipcode', display: 'Zipcode' },
         { value: 'state', display: 'State' },
      ]

      const errorArray = []

      requiredInfo.forEach(field => {
         if (!info[field.value] || !info[field.value].length) {
            errorArray.push(field.display)
         }
      })

      if (errorArray.length) {
         return `The following fields are required: ${errorArray.reduce(
            (accum, current) => accum + ', ' + current,
         )}`
      }

      return false
   }

   _submit = async () => {
      const { addNewProperty } = this.props
      const { info, rooms } = this.state

      const validation = await this._validation()

      if (validation) {
         Alert.alert('Missing Info', validation)
      } else {
         const uniqueID = generateUniqueID()
         const roomsArray = Object.values(rooms)
            .sort(this._sortRooms)
            .map(room => room.name)

         const newProperty = {
            ...info,
            id: uniqueID,
            rooms: roomsArray,
            inventoryTotal: 0,
            requestTotal: 0,
         }
         this.setState({ isUploading: true })
         await addNewProperty(newProperty)
         this.setState({ isUploading: true })
         this._navigateBack()
      }
   }

   render() {
      const { rooms } = this.state
      const sortRooms = (roomA, roomB) => {
         if (roomA.key < roomB.key) {
            return -1
         }
         if (roomA.key > roomB.key) {
            return 1
         }
         return 0
      }
      const { isUploading } = this.state

      return (
         <Page
            title='Add New Property'
            headerType='modal'
            onPressIcon={this._navigateBack}
            style={styles.container}
            scrollview
         >
            <View
               style={[styles.subText, { marginTop: SPACING.list.vertical }]}
            >
               <SmallText color={COLORS.SECONDARY}>
                  Property Information
               </SmallText>
            </View>
            <Input
               placeholder='Property Name'
               onChange={text => this._onChangeText(text, 'name')}
            />
            <Input
               placeholder='Address 1'
               onChange={text => this._onChangeText(text, 'address1')}
            />
            <Input
               placeholder='Address 2'
               onChange={text => this._onChangeText(text, 'address2')}
               optional
            />
            <Input
               placeholder='City'
               onChange={text => this._onChangeText(text, 'city')}
            />
            <View style={styles.dualInputContainer}>
               <Input
                  placeholder='State'
                  onChange={text => this._onChangeText(text, 'state')}
                  width={DEVICE.width * 0.34}
               />
               <Input
                  placeholder='Zip Code'
                  onChange={text => this._onChangeText(text, 'zipcode')}
                  width={DEVICE.width * 0.34}
               />
            </View>
            <Input
               placeholder='Country'
               onChange={text => this._onChangeText(text, 'country')}
               optional
            />
            <View
               style={[styles.subText, { marginTop: SPACING.list.vertical }]}
            >
               <SmallText color={COLORS.SECONDARY}>Rooms</SmallText>
            </View>
            {Object.values(rooms)
               .sort(this._sortRooms)
               .map((room, index) => (
                  <Input
                     placeholder={`Room ${index + 1}`}
                     key={room.key}
                     onChange={value => {
                        this._editRooms(value, room.key)
                     }}
                     initialValue={room.name}
                     width={DEVICE.width * 0.8 - 30}
                     buttonComponent={
                        <RoundIconButton
                           iconName='md-remove'
                           buttonColor={COLORS.SECONDARY}
                           onPress={() => this._deleteRoom(room.key)}
                           size={25}
                        />
                     }
                  />
               ))}
            <RoundIconButton
               buttonColor={COLORS.SECONDARY}
               onPress={this._addRoom}
               style={{ marginVertical: SPACING.list.vertical }}
               size={35}
            />
            <View style={styles.subText}>
               <SmallText color={COLORS.GRAY}>Add a photo</SmallText>
            </View>
            <ImagePicker onSelect={fileName => this._onChangePhoto(fileName)} />
            {!isUploading && (
               <Button
                  style={styles.button}
                  onPress={this._submit}
                  title='SAVE'
               />
            )}
            <Spinner visible={isUploading} />
         </Page>
      )
   }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
   addNewProperty: (newProperty, navigation) =>
      dispatch(addNewPropertyAPI(newProperty, navigation)),
   deleteProperty: (idValue, identifier) =>
      dispatch(deletePropertyAPI(idValue, identifier)),
   getAllUserData: () => dispatch(getAllUserDataAPI()),
})

NewProperty = connect(
   mapStateToProps,
   mapDispatchToProps,
)(NewProperty)
export { NewProperty }
