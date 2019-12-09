import * as ImageManipulator from 'expo-image-manipulator'
import {
   cloudinaryApiUrl,
   cloudinaryUploadPreset,
   cloudinaryAPI,
} from '../config/cloudinary'

const saveImageToCloudinary = async (rawBase64Data, uri) => {
   if (!rawBase64Data) {
      return null
   } else {
      try {
         let compressedImage = await ImageManipulator.manipulateAsync(uri, [], {
            compress: 0.5,
            format: ImageManipulator.SaveFormat.JPEG,
            base64: true,
         })
         console.log(compressedImage)
         // Prepare Data
         let data = {
            body: JSON.stringify({
               file: `data:image/png;base64,${compressedImage.base64}`,
               upload_preset: cloudinaryUploadPreset,
            }),
            headers: {
               'content-type': 'application/json',
            },
            method: 'POST',
         }
         //Api call
         let res = await fetch(cloudinaryApiUrl, data)
         let json = await res.json()
         let secureUrl = json.secure_url
         if (secureUrl) {
            console.log('Image uploaded')
         } else {
            throw 'Image NOT uploaded - Unknown Error'
         }
         return secureUrl
      } catch (err) {
         console.log('Error compressing image:', err)
      }
   }
}
export { saveImageToCloudinary }
