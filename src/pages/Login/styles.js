import { StyleSheet } from 'react-native'
import { COLORS, DEVICE, SPACING } from '../../config'

const styles = {
   pageOne: StyleSheet.create({
      container: {
         flex: 1,
      },
      upperContainer: {
         flex: 0.8,
         backgroundColor: COLORS.PRIMARY,
         justifyContent: 'flex-end',
         alignItems: 'center',
         paddingBottom: '15%',
      },
      lowerContainer: {
         flex: 0.2,
         justifyContent: 'center',
         alignItems: 'center',
      },
      welcomeRow: {
         flexDirection: 'row',
         paddingLeft: '5%',
      },
      logoContainer: {
         flex: 0.4,
         marginRight: 15,
      },
      logo: {
         height: DEVICE.width * 0.35,
         width: DEVICE.width * 0.4,
      },
      textContainer: {
         flex: 0.6,
         justifyContent: 'center',
      },
      buttonContainer: {
         marginBottom: 15,
      },
   }),
   pageTwo: StyleSheet.create({
      container: {
         flexGrow: 1,
      },
      backIconContainer: {
         paddingLeft: '10%',
         height: '10%',
         justifyContent: 'flex-end',
      },
      upperContainer: {
         flex: 0.8,
         justifyContent: 'center',
         alignItems: 'center',
         paddingTop: '5%',
      },
      lowerContainer: {
         flex: 0.2,
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: COLORS.PRIMARY,
      },
      dualInputContainer: {
         flexDirection: 'row',
         width: '100%',
         justifyContent: 'space-evenly',
         alignItems: 'center',
      },
      inputContainer: {
         width: '100%',
         alignItems: 'center',
      },
      buttonContainer: {
         marginTop: SPACING.list.vertical * 2,
      },
      textContainer: {
         justifyContent: 'center',
         textAlign: 'center',
         paddingHorizontal: '5%',
         paddingTop: '2.5%',
      },
   }),
}

export { styles }
