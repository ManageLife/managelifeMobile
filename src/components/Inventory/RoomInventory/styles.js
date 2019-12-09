import { StyleSheet } from 'react-native'
import { COLORS, SPACING } from '../../../config'

const containerHeight = 50

const styles = StyleSheet.create({
   container: {
      marginTop: 5,
   },
   headerContainer: {
      height: containerHeight,
      justifyContent: 'center',
   },
   contentContainer: {
      height: containerHeight,
      justifyContent: 'center',
   },
})

export { styles }
