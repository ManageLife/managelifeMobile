import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import ScalableText from 'react-native-text'
import { Ionicons as Icon } from '@expo/vector-icons'
import { ActionButtons } from './ActionButtons'
import { COLORS } from '../../../config'
import { styles } from './styles'

const Button = ({ onPress, title, style }) => (
   <TouchableOpacity onPress={onPress} style={[styles.Button.container, style]}>
      <Text style={styles.Button.textStyle}>{title}</Text>
   </TouchableOpacity>
)

const TouchableIcon = ({ onPress, name, style, size, color }) => (
   <TouchableOpacity style={style} onPress={onPress}>
      <Icon name={name} size={size || 36} color={color || COLORS.WHITE} />
   </TouchableOpacity>
)

const RoundIconButton = ({
   onPress,
   iconName,
   style,
   size,
   buttonColor,
   iconColor,
}) => (
   <TouchableOpacity
      style={{
         height: size || 30,
         width: size || 30,
         borderRadius: 100,
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: buttonColor || COLORS.SECONDARY,
         ...style,
      }}
      onPress={onPress}
   >
      <Icon
         name={iconName || 'ios-add'}
         size={size ? size - 12 : 18}
         color={iconColor || COLORS.WHITE}
      />
   </TouchableOpacity>
)

const CardButton = ({
   onPress,
   title,
   iconName,
   iconColor,
   iconSize,
   style,
}) => (
   <TouchableOpacity
      style={[styles.CardButton.container, style]}
      onPress={onPress}
   >
      <Icon
         name={iconName || 'ios-add'}
         size={iconSize ? iconSize - 12 : 30}
         color={iconColor || COLORS.WHITE}
         style={styles.CardButton.iconStyle}
      />
      <Text style={styles.Button.textStyle}>{title}</Text>
   </TouchableOpacity>
)

const BasicButton = ({ onPress, title, bg }) => (
   <TouchableOpacity
      onPress={onPress}
      style={{
         backgroundColor: bg || COLORS.PRIMARY,
         height: '10%',
         width: '96%',
         margin: '3%',
         justifyContent: 'center',
         alignItems: 'center',
      }}
   >
      <ScalableText style={styles.basicButtonText}>{title}</ScalableText>
   </TouchableOpacity>
)

export {
   TouchableIcon,
   ActionButtons,
   Button,
   RoundIconButton,
   CardButton,
   BasicButton,
}
