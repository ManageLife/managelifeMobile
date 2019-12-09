import { StyleSheet } from 'react-native'
import { COLORS, DEVICE } from '../../../config'

const styles = StyleSheet.create({
   container: {
      width: DEVICE.width * 0.92,
      backgroundColor: COLORS.WHITE,
      shadowColor: COLORS.BLACK,
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      paddingHorizontal: 25,
   },
})

export { styles }
