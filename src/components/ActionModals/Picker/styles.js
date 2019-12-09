import { StyleSheet } from 'react-native'
import { COLORS, DEVICE } from '../../../config'

const styles = StyleSheet.create({
   outerContainer: {
      marginVertical: 10,
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
      paddingVertical: 12,
      paddingHorizontal: 6,
      minHeight: 45,
   },
   inputText: {
      fontFamily: 'Roboto',
      color: COLORS.BLACK,
   },
})

export { styles }
