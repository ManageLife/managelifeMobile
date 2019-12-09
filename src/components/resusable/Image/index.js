import React from 'react'
import { View, Image, Dimensions } from 'react-native'
import { useResponsiveImageView as useImgView } from 'react-native-responsive-image-view'

function ImageContainer({ source }) {
   const { getViewProps, getImageProps } = useImgView({
      source: source,
   })
   return (
      <View {...getViewProps()}>
         <Image {...getImageProps()} />
      </View>
   )
}

const percentCleaner = input => {
   if (input) {
      if (typeof input === 'number') {
         return input
      }
      let percentString
      if (input.indexOf('.' || '%') > -1) {
         percentString = input.slice(input.indexOf('.' || '%'))
      }
      return partInt(`0.${percentString}`)
   }
}

export { ImageContainer }
