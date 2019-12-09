import React, { PureComponent } from 'react'
import { View, Image, TouchableOpacity, Alert } from 'react-native'
import { Ionicons as Icon } from '@expo/vector-icons'
import * as ImageSelect from 'expo-image-picker'
import * as RNFS from 'expo-file-system'
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'
import AutoHeightImage from 'react-native-auto-height-image'
import { SmallText } from '../../Text'
import { Input } from '../../Input'
import { RoundIconButton } from '../../Buttons'
import { styles } from './styles'
import { COLORS, DEVICE } from '../../../../config'

class ImagePickerInput extends PureComponent {
   state = {
      imageSource: null,
   }

   _getPermissionAsync = async type => {
      if (type === 'camera') {
         const { status } = await Permissions.askAsync(Permissions.CAMERA)
         if (status !== 'granted') {
            return false
         }
         return true
      } else {
         if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(
               Permissions.CAMERA_ROLL,
            )
            if (status !== 'granted') {
               return false
            }
            return true
         }
      }
   }

   _pickImage = async () => {
      const { onSelect } = this.props

      await Alert.alert(
         'Add a photo',
         null,
         [
            {
               text: 'Cancel',
               style: 'cancel',
            },
            {
               text: 'Open Camera',
               onPress: async () => {
                  const permissions = await this._getPermissionAsync('camera')
                  if (permissions) {
                     let result = await ImageSelect.launchCameraAsync({
                        base64: true,
                     })
                     if (!result.cancelled) {
                        let { uri, base64 } = result
                        const base64Image = `data:image/png;base64,${base64}`
                        this.setState({ imageSource: uri })
                        let imageData = { uri, base64: base64Image }
                        onSelect(imageData)
                     }
                  }
               },
            },
            {
               text: 'Existing Photo',
               onPress: async () => {
                  const permissions = await this._getPermissionAsync(
                     'cameraRoll',
                  )
                  if (permissions) {
                     let result = await ImageSelect.launchImageLibraryAsync({
                        base64: true,
                     })
                     if (!result.cancelled) {
                        let { uri, base64 } = result
                        const base64Image = `data:image/png;base64,${base64}`
                        this.setState({ imageSource: uri })
                        let imageData = { uri, base64: base64Image }
                        onSelect(imageData)
                     }
                  }
               },
            },
         ],
         { cancelable: false },
      )
   }

   render() {
      const { imageSource } = this.state
      const { placeholder, onChange, optional } = this.props

      if (imageSource) {
         return (
            <View style={styles.photoText}>
               <SmallText color={COLORS.GRAY}>{placeholder}</SmallText>
               <TouchableOpacity
                  style={styles.container}
                  onPress={this._pickImage}
               >
                  {imageSource ? (
                     <AutoHeightImage
                        width={DEVICE.width * 0.8}
                        source={{ uri: imageSource }}
                     />
                  ) : (
                     <View style={styles.placeholderContainer}>
                        <Icon
                           color={COLORS.PRIMARY}
                           size={50}
                           name='md-images'
                        />
                     </View>
                  )}
               </TouchableOpacity>
            </View>
         )
      }
      return (
         <Input
            onChange={onChange}
            placeholder={placeholder}
            optional={optional}
            width={DEVICE.width * 0.8 - 35}
            buttonComponent={
               <RoundIconButton
                  iconName='ios-camera'
                  onPress={this._pickImage}
               />
            }
         />
      )
   }
}

export { ImagePickerInput }
