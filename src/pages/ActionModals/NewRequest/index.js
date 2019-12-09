import React, { PureComponent } from 'react'
import { View, Alert } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { connect } from 'react-redux'
import moment from 'moment'
import {
   Page,
   Input,
   InputPlaceholder,
   ImagePicker,
   SmallText,
   Picker,
   Button,
   DatePicker,
} from '../../../components'
import { generateUniqueID } from '../../../utils'
import { sendRequestEmail } from '../../../utils/firestoreHelpers'
import { addNewRequestAPI } from '../../../redux'
import { getAllUserDataAPI } from '../../../redux/API/user'
import { COLORS, DEVICE } from '../../../config'
import { styles } from './styles'

class NewRequest extends PureComponent {
   componentDidMount() {
      const { getAllUserData } = this.props
      getAllUserData()
   }
   state = {
      info: {
         description: null,
         // type: null,
         property: null,
         room: null,
         item: null,
         date: moment().toISOString(),
         image: { local: null, firebase: null },
         isProblemReport: this.props.isProblemReport || false,
      },
      isUploading: false,
   }

   _onChangeText = (text, type) => {
      this.setState(prevState => ({
         info: { ...prevState.info, [type]: text },
      }))
   }

   _onChangePicker = (value, type) => {
      this.setState(prevState => ({
         info: { ...prevState.info, [type]: value },
      }))
   }

   _onChangePhoto = imageData => {
      this.setState(prevState => ({
         info: { ...prevState.info, image: imageData },
      }))
   }

   _filterProperties = () => {
      const { properties } = this.props

      const labelProperties = properties.length
         ? properties.map(property => ({
              label: property.name,
              value: property,
           }))
         : []

      return labelProperties
   }

   _filterItems = property => {
      const { inventory } = this.props
      const inventoryList = property
         ? inventory
              .filter(item => item.property.name === property)
              .map(item => ({
                 label: `${item.name} (${item.room})`,
                 value: item,
              }))
         : []

      return inventoryList
   }

   _navigateBack = () => {
      const { goBack } = this.props.navigation
      goBack()
   }

   _validation = () => {
      const { info } = this.state

      const requiredInfo = [
         { value: 'description', display: 'Description' },
         { value: 'type', display: 'Request Type' },
         { value: 'property', display: 'Property' },
         { value: 'room', display: 'Room' },
         { value: 'item', display: 'Item' },
         { value: 'date', display: 'Date' },
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
      const { info, isUploading } = this.state
      const { addNewRequest, user, navigation } = this.props

      const validation = false

      if (validation) {
         Alert.alert('Missing Info', validation)
      } else {
         const uniqueID = await generateUniqueID()
         const emailInfo = {
            email: user.email,
            username: `${user.firstName} ${user.lastName}` || 'N/A',
            phoneNumber: user.phoneNumber || 'N/A',
            property: info.property.name || 'N/A',
            item: info.item.name || 'N/A',
            address:
               `${info.property.address1}, ${info.property.city} ${info.property.zipcode}` ||
               'N/A',
            room: info.item.room || 'N/A',
            description: info.description || 'N/A',
            time: info.date
               ? moment(info.date).format('MMM Do, h:mm a')
               : 'N/A',
            requestID: uniqueID,
         }
         this.setState({ isUploading: true })
         await addNewRequest({ ...info, status: 'processing', id: uniqueID })
         this.setState({ isUploading: false })
         sendRequestEmail(emailInfo)
         this._navigateBack()
      }
   }
   render() {
      const { info, isUploading } = this.state
      const { isProblemReport, navigation } = this.props
      const item = navigation.state.params
      const { request, problemReport } = pageStrings
      return (
         <Page
            title={isProblemReport ? problemReport.title : request.title}
            headerType='modal'
            onPressIcon={this._navigateBack}
            style={styles.container}
            scrollview
         >
            <Input
               placeholder={
                  isProblemReport ? problemReport.issue : request.issue
               }
               onChange={text => this._onChangeText(text, 'description')}
               height={DEVICE.height * 0.2}
            />
            {item ? (
               <View>
                  <InputPlaceholder placeholder='Property'>
                     {item.property.name}
                  </InputPlaceholder>
                  <InputPlaceholder placeholder='Item'>
                     {item.name}
                  </InputPlaceholder>
               </View>
            ) : (
               <View>
                  <Picker
                     placeholder='Property'
                     pickerPlaceholder='Select a property...'
                     items={this._filterProperties()}
                     onChange={value => this._onChangePicker(value, 'property')}
                  />
                  <Picker
                     placeholder='Item'
                     pickerPlaceholder='Select an item...'
                     items={this._filterItems(
                        info.property && info.property.name
                           ? info.property.name
                           : null,
                     )}
                     onChange={value => this._onChangePicker(value, 'item')}
                  />
               </View>
            )}
            <DatePicker
               placeholder={
                  isProblemReport ? problemReport.dueDate : request.dueDate
               }
               onConfirm={input =>
                  this._onChangePicker(moment(input).toISOString(), 'date')
               }
            />
            <View style={styles.photoText}>
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

const pageStrings = {
   request: {
      title: 'New Request',
      issue: 'What issue are you having?',
      dueDate: 'When would you like that done?',
   },
   problemReport: {
      title: 'Report a Problem',
      issue: 'What issue are you having?',
      dueDate: 'When can we contact you?',
   },
}

const mapStateToProps = state => ({
   user: state.user,
   properties: Object.values(state.properties),
   inventory: Object.values(state.inventory),
})

const mapDispatchToProps = dispatch => ({
   getAllUserData: () => dispatch(getAllUserDataAPI()),
   addNewRequest: newRequest => dispatch(addNewRequestAPI(newRequest)),
})

NewRequest = connect(
   mapStateToProps,
   mapDispatchToProps,
)(NewRequest)
export { NewRequest }
