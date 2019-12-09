import { StyleSheet } from 'react-native'
import { COLORS, DEVICE } from '../../../config'

const styles = StyleSheet.create({
   container: {
      width: DEVICE.width,
      height: DEVICE.height * 0.15,
      backgroundColor: COLORS.PRIMARY,
      flexDirection: 'row',
   },
   centerContainer: {
      flex: 0.6,
      justifyContent: 'center',
      alignItems: 'center',
   },
   sideContainer: {
      flex: 0.2,
      justifyContent: 'center',
      alignItems: 'center',
   },
   headerText: {
      fontSize: 22,
      color: COLORS.WHITE,
   },
})

export { styles }
