import { StyleSheet } from 'react-native'
import { COLORS, SPACING } from '../../../config'

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   viewContainer: {
      flex: 1,
      marginVertical: 25,
   },
   scrollviewContentContainer: {
      flexGrow: 1,
      paddingBottom: 50,
      paddingTop: SPACING.list.vertical,
   },
   headerText: {
      fontSize: 22,
      color: COLORS.WHITE,
      fontFamily: 'RobotoBold',
   },
   headerStyle: {
      backgroundColor: COLORS.SECONDARY,
   },
   leftIcon: {
      marginLeft: 15,
   },
   rightIcon: {
      marginRight: 15,
   },
})

export { styles }
