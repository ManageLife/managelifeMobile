import { StyleSheet } from 'react-native'
import { COLORS, SPACING } from '../../../config'

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
   inputText: {
      fontFamily: 'Roboto',
      color: COLORS.BLACK,
   },
   darkModeContainer: {
      backgroundColor: COLORS.DARK_GRAY,
   },
})

export { styles }
