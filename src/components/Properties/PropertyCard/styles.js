import { StyleSheet } from 'react-native'
import { COLORS, SPACING } from '../../../config'

const styles = StyleSheet.create({
   container: {
      height: 225,
      marginTop: SPACING.list.vertical,
      paddingVertical: 15,
   },
   popupMenu: {
      flex: 0.1,
      alignItems: 'flex-end',
   },
   upperRow: {
      flex: 0.7,
      flexDirection: 'row',
   },
   imageContainer: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
   },
   image: {
      height: '100%',
      width: '100%',
   },
   contentContainer: {
      flex: 0.5,
      justifyContent: 'center',
      paddingLeft: 15,
   },
   headerText: {
      fontSize: 22,
   },
   lowerRow: {
      flex: 0.25,
      flexDirection: 'row',
      borderTopWidth: 0.5,
      borderColor: COLORS.PRIMARY,
      marginTop: 15,
   },
   lowersubContainer: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
   },
   placeholderContainer: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.LIGHT_GRAY,
      borderRadius: 5,
   },
})

export { styles }
