import { StyleSheet } from 'react-native'
import { COLORS, SPACING } from '../../config'

const styles = StyleSheet.create({
   container: {
      alignItems: 'center',
      paddingTop: SPACING.list.vertical,
   },
   roomListContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: COLORS.PRIMARY_LIGHT,
      paddingRight: '2%',
      paddingLeft: '1%', //doubled due to use in <TouchableOpacity/> for Room name
   },
   roomName: {
      color: COLORS.WHITE,
      fontFamily: 'Roboto',
      fontSize: 25,
   },
   inventoryContainer: {
      marginTop: SPACING.list.vertical * 2,
   },
   placeholderCard: {
      paddingVertical: 50,
      marginVertical: SPACING.list.vertical,
   },
})

export { styles }
