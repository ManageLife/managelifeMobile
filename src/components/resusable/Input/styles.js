import { StyleSheet } from 'react-native'
import { COLORS, SPACING, DEVICE } from '../../../config'

const styles = StyleSheet.create({
   outerContainer: {
      marginVertical: SPACING.list.vertical,
   },
   placeholderContainer: {
      paddingLeft: 3,
      marginBottom: 2.5,
   },
   placeholderText: {
      fontSize: 12,
      fontFamily: 'Roboto',
      color: COLORS.GRAY,
   },
   innerContainer: {
      borderColor: COLORS.GRAY,
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 6,
      minHeight: 45,
   },
   rowWrapper: {
      width: DEVICE.width * 0.8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   inputText: {
      fontFamily: 'Roboto',
      color: COLORS.BLACK,
   },
})

export { styles }
