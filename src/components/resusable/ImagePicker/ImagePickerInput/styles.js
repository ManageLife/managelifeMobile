import { StyleSheet } from 'react-native'
import { DEVICE, COLORS, SPACING } from '../../../../config'

const styles = StyleSheet.create({
   container: {
      width: DEVICE.width * 0.8,
      borderRadius: 5,
      marginTop: SPACING.list.vertical,
   },
   image: {
      width: DEVICE.width * 0.8,
      height: DEVICE.height * 0.2,
      borderRadius: 5,
   },
   placeholderContainer: {
      width: '100%',
      minHeight: DEVICE.height * 0.2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.LIGHT_GRAY,
      borderRadius: 5,
   },
   photoText: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '80%',
   },
})

export { styles }
