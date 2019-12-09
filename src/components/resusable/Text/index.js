import React from 'react'
import { Text } from 'react-native'
import { COLORS, DEVICE } from '../../../config'
import { styles } from './styles'

const HeaderText = ({ children, style, color, lineHeight }) => (
   <Text
      style={[
         styles.headerText,
         {
            color: color || COLORS.BLACK,
            fontFamily: 'RobotoBold',
            lineHeight: lineHeight || null,
         },
         style,
      ]}
   >
      {children}
   </Text>
)

const SubheaderText = ({
   children,
   style,
   color,
   light,
   bold,
   textAlign,
   lineHeight,
}) => (
   <Text
      style={[
         light ? styles.smallsubheaderText : styles.subheaderText,
         {
            color: color || COLORS.BLACK,
            fontFamily: bold ? 'RobotoBold' : 'Roboto',
            fontWeight: light ? 'normal' : 'bold',
            lineHeight: lineHeight || null,
            textAlign: textAlign || null,
         },
         style,
      ]}
   >
      {children}
   </Text>
)

const SmallText = ({ children, style, bold, color, onPress, textAlign }) => (
   <Text
      style={[
         styles.smallText,
         {
            color: color || COLORS.BLACK,
            fontFamily: bold ? 'RobotoBold' : 'Roboto',
            fontWeight: bold ? 'bold' : null,
            textAlign: textAlign || null,
         },
         style,
      ]}
      onPress={onPress || null}
   >
      {children}
   </Text>
)

export { HeaderText, SubheaderText, SmallText }
