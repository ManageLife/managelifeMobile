import { ENV } from '../../../environment'
const {
   REACT_APP_CLOUDINARY_CLOUD_NAME: cloudName,
   REACT_APP_CLOUDINARY_UPLOAD_PRESET: uploadPreset,
   CLOUDINARY_API_KEY: apiKey,
} = ENV.dev

const cloudinaryApiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
const cloudinaryUploadPreset = uploadPreset
const cloudinaryAPI = apiKey

export { cloudinaryApiUrl, cloudinaryUploadPreset, cloudinaryAPI }
