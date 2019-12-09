import { StyleSheet } from 'react-native'
import { COLORS, SPACING } from '../../../config'

const styles = {
   Button: StyleSheet.create({
      container: {
         backgroundColor: COLORS.SECONDARY,
         borderRadius: 10,
         paddingHorizontal: 10,
         paddingVertical: 5,
         minWidth: 110,
         minHeight: 45,
         justifyContent: 'center',
         alignItems: 'center',
         marginVertical: SPACING.list.vertical,
      },
      textStyle: {
         color: COLORS.WHITE,
         fontSize: 22,
      },
   }),
   TouchableIcon: StyleSheet.create({}),
   CardButton: StyleSheet.create({
      container: {
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
         minWidth: 100,
         backgroundColor: COLORS.SECONDARY,
         shadowColor: COLORS.BLACK,
         shadowOffset: {
            width: 0,
            height: 2,
         },
         shadowOpacity: 0.25,
         shadowRadius: 3.84,

         elevation: 5,
         paddingHorizontal: 25,
      },
      iconStyle: {
         marginRight: 10,
      },
   }),
   basicButtonText: { color: COLORS.WHITE, fontWeight: 'bold' },
}
export { styles }
