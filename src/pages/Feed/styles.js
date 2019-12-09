import { StyleSheet } from 'react-native'
import { COLORS, SPACING, DEVICE } from '../../config'

const styles = StyleSheet.create({
   container: {
      alignItems: 'center',
   },
   upperContainer: {
      flex: 0.5,
      width: '90%',
   },
   dashboardContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   lowerContainer: {
      flex: 0.5,
      paddingVertical: SPACING.list.vertical,
      marginTop: 10,
      alignItems: 'center',
      // borderColor: COLORS.GRAY,
      // borderTopWidth: 2,
   },
   cardButtonRow: {
      flexDirection: 'row',
      paddingTop: 25,
   },
   cardButton: {
      height: '30%',
      width: DEVICE.width * 0.35,
      height: 50,
      marginHorizontal: 5,
   },
})

export { styles }
