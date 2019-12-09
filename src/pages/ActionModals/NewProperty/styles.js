import { StyleSheet } from 'react-native'
import { COLORS, DEVICE } from '../../../config'

const styles = StyleSheet.create({
   container: {
      alignItems: 'center',
   },
   dualInputContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-evenly',
      alignItems: 'center',
   },
   subText: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '80%',
   },
})

export { styles }
