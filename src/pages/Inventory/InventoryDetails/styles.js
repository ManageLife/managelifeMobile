import { StyleSheet } from 'react-native'
import { COLORS, SPACING, DEVICE } from '../../../config'

const styles = StyleSheet.create({
   pageContainer: {
      marginBottom: '1%',
      alignItems: 'center',
   },
   detailsCard: {
      width: '96%',
      marginRight: '2%',
      marginLeft: '2%',
      marginVertical: SPACING.list.vertical,
   },
   fieldContainer: {
      display: 'flex',
      flexDirection: 'row',
      padding: '3%',
   },
   imageContainer: {
      width: '100%',
      alignItems: 'center',
      paddingVertical: '4%',
      marginBottom: SPACING.list.vertical,
   },
   button: {
      backgroundColor: COLORS.RED,
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: DEVICE.width * 0.8,
      minHeight: 45,
      justifyContent: 'center',
      alignItems: 'center',
   },
   buttonText: {
      color: COLORS.WHITE,
      fontSize: 18,
   },
   modal: {
      justifyContent: 'center',
      alignItems: 'center',
   },
})

export { styles }
