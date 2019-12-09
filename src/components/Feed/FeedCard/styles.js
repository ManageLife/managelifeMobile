import { StyleSheet } from 'react-native'
import { COLORS, SPACING, DEVICE } from '../../../config'

const containerHeight = 50

const styles = StyleSheet.create({
   wrapper: {
      marginVertical: SPACING.list.vertical,
   },
   container: {
      marginTop: 5,
   },
   titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   headerContainer: {
      height: DEVICE.height * 0.1,
      alignItems: 'center',
      flexDirection: 'row',
   },
   contentContainer: {
      justifyContent: 'center',
      paddingBottom: 10,
      paddingHorizontal: 5,
   },
   noContentContainer: {
      height: DEVICE.height * 0.1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 15,
      flexDirection: 'row',
   },
})

export { styles }
