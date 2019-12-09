import { StyleSheet } from 'react-native'
import { COLORS, SPACING } from '../../../config'

const styles = StyleSheet.create({
   container: {
      alignItems: 'center',
      paddingTop: 10,
   },
   dualInputContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-evenly',
      alignItems: 'center',
   },
   photoText: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '80%',
      marginTop: 5,
      marginBottom: 10,
   },
   button: {
      marginTop: 20,
   },
})

export { styles }
