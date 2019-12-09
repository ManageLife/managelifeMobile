import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './styles'

const Header = ({ leftComponent, rightComponent, title }) => (
   <View style={styles.container}>
      <View style={styles.sideContainer}>{leftComponent || null}</View>
      <View style={styles.centerContainer}>
         <Text style={styles.headerText}>{title}</Text>
      </View>
      <View style={styles.sideContainer}>{rightComponent || null}</View>
   </View>
)

export { Header }
