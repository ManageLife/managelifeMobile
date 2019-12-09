import React, { PureComponent } from 'react'
import { View, Alert } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { connect } from 'react-redux'
import { addNewItemAPI } from '../../../redux'
import {
   Page,
   Input,
   ImagePicker,
   ImagePickerInput,
   SmallText,
   Picker,
   Button,
} from '../../../components'
import { getAllUserDataAPI, updateUserInfoAPI } from '../../../redux/API/user'
import { generateUniqueID } from '../../../utils'
import { COLORS } from '../../../config'
import { styles } from './styles'

class NewItem extends PureComponent {
   componentDidMount() {
      const { getAllUserData } = this.props
      getAllUserData()
   }
   state = {
      info: {
         name: null,
         category: null,
         brand: null,
         serialNumber: null,
         modelNumber: null,
         color: null,
         property: null,
         room: null,
         image: { uri: null, base64: null },
      },
      newRoom: false,
      newCategory: false,
      isUploading: false,
   }

   _onChangeText = (text, type) => {
      this.setState(prevState => ({
         info: { ...prevState.info, [type]: text },
      }))
   }

   _onChangePicker = (value, type) => {
      if (value === 'addNew') {
         this.setState({ newCategory: true })
      } else {
         this.setState(prevState => ({
            info: { ...prevState.info, [type]: value },
         }))
      }
   }

   _onChangePhoto = (imageData, type) => {
      this.setState(prevState => ({
         info: { ...prevState.info, [!type ? 'image' : type]: imageData },
      }))
   }

   _validation = () => {
      const { info } = this.state

      const requiredInfo = [
         { value: 'name', display: 'Name' },
         { value: 'category', display: 'Category' },
         { value: 'property', display: 'Property' },
         { value: 'room', display: 'Room' },
      ]

      const errorArray = []

      requiredInfo.forEach(field => {
         if (field.value === 'property') {
            if (!info[field.value] || !info[field.value].name) {
               errorArray.push(field.display)
            }
         } else {
            if (!info[field.value] || !info[field.value].length) {
               errorArray.push(field.display)
            }
         }
      })

      if (errorArray.length) {
         return `The following fields are required: ${errorArray.reduce(
            (accum, current) => accum + ', ' + current,
         )}`
      }

      return false
   }

   _navigateBack = () => {
      const { goBack } = this.props.navigation
      goBack()
   }

   _editCategories = () => {
      const { itemCategories } = this.props
      const { newCategory, info } = this.state

      const saveCategories = itemCategories.slice()
      if (newCategory) {
         saveCategories.push(info.category)
      }

      return saveCategories.sort()
   }

   _submit = async () => {
      const { info, newCategory } = this.state
      const { addNewItem, updateUserInfo } = this.props

      const validation = await this._validation()

      if (validation) {
         Alert.alert('Missing Info', validation)
      } else {
         const uniqueID = generateUniqueID()

         const newItem = {
            ...info,
            property: info.property,
            id: uniqueID,
         }

         if (newCategory) {
            const itemCategories = await this._editCategories()
            await updateUserInfo({ itemCategories })
         }
         this.setState({ isUploading: true })
         await addNewItem(newItem)
         this.setState({ isUploading: false })
         this._navigateBack()
      }
   }

   render() {
      const { properties, itemCategories } = this.props
      const { newCategory, info, isUploading } = this.state

      // Item categories; static for now, but will need to be changed
      const itemCategoriesList = itemCategories.map(category => ({
         label: category,
         value: category,
      }))

      const propertyList = properties.map(property => ({
         label: property.name,
         value: { ...property },
      }))

      return (
         <Page
            title='Add New Item'
            headerType='modal'
            onPressIcon={this._navigateBack}
            style={styles.container}
            scrollview
         >
            <Input
               placeholder='Item Name'
               onChange={text => this._onChangeText(text, 'name')}
            />
            {newCategory ? (
               <Input
                  placeholder='New category'
                  onChange={text => this._onChangeText(text, 'category')}
               />
            ) : (
               <Picker
                  placeholder='Category'
                  pickerPlaceholder='Select a category...'
                  items={itemCategoriesList}
                  onChange={value => this._onChangePicker(value, 'category')}
                  addNewLabel='Add new category...'
               />
            )}

            <Input
               placeholder='Brand'
               onChange={text => this._onChangeText(text, 'brand')}
               optional
            />
            <ImagePickerInput
               placeholder='Serial Number'
               onChange={text => this._onChangeText(text, 'serialNumber')}
               onSelect={fileName =>
                  this._onChangePhoto(fileName, 'serialNumber')
               }
               optional
            />
            <ImagePickerInput
               placeholder='Model Number'
               onChange={text => this._onChangeText(text, 'modelNumber')}
               onSelect={fileName =>
                  this._onChangePhoto(fileName, 'modelNumber')
               }
               optional
            />
            <Input
               placeholder='Color'
               onChange={text => this._onChangeText(text, 'color')}
               optional
            />
            <Picker
               placeholder='Property'
               pickerPlaceholder={'Select a property...'}
               initialValue
               items={propertyList}
               onChange={value => this._onChangePicker(value, 'property')}
            />
            <Picker
               placeholder='Room'
               pickerPlaceholder='Select a room...'
               items={
                  info.property && info.property.rooms.length
                     ? info.property.rooms.map(room => ({
                          label: room,
                          value: room,
                       }))
                     : []
               }
               onChange={value => this._onChangePicker(value, 'room')}
               disabled={!info.property}
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

const mapStateToProps = state => ({
   itemCategories: state.user.itemCategories,
   properties: Object.values(state.properties),
})

const mapDispatchToProps = dispatch => ({
   addNewItem: (newItem, newRoom, navigation) =>
      dispatch(addNewItemAPI(newItem, newRoom, navigation)),
   getAllUserData: () => dispatch(getAllUserDataAPI()),
   updateUserInfo: info => dispatch(updateUserInfoAPI(info)),
})
NewItem = connect(
   mapStateToProps,
   mapDispatchToProps,
)(NewItem)

export { NewItem }
