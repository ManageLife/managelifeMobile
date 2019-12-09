import { StyleSheet } from 'react-native'
import { scaleText } from 'react-native-text'
import { COLORS, DEVICE } from '../../../config'

// Automatically scales fontSize - uses iPhone XR for base dimensions
const baseWidth = 414
const styles = {
   fontFamily: 'Roboto',
   headerText: scaleText({
      deviceBaseWidth: baseWidth,
      fontSize: 34,
   }),
   subheaderText: scaleText({
      deviceBaseWidth: baseWidth,
      fontSize: 26,
   }),
   smallsubheaderText: scaleText({
      deviceBaseWidth: baseWidth,
      fontSize: 22,
   }),
   smallText: scaleText({
      deviceBaseWidth: baseWidth,
      fontSize: 18,
   }),
}

export { styles }
