import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { withNavigation } from 'react-navigation' // eslint-disable-line
import { KeyboardAwareScrollView as ScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Header } from 'react-native-elements'
import { TouchableIcon, ActionButtons } from '../Buttons'
import { COLORS, SPACING } from '../../../config'
import { styles } from './styles'

class Page extends PureComponent {
   state = {
      newRequestVisible: false,
      newPropertyVisible: false,
      newItemVisible: false,
   }

   _toggleModal = type => {
      this.setState(prevState => ({ [type]: !prevState[type] }))
   }

   render() {
      const {
         children,
         scrollview,
         navigation,
         title,
         headerType,
         onPressIcon,
         onPressIconLeft,
         onPressIconRight,
         style,
         actionButtons,
      } = this.props

      const ViewType = scrollview ? (
         <ScrollView
            contentContainerStyle={[
               styles.scrollviewContentContainer,
               { backgroundColor: COLORS.WHITE },
               style || null,
            ]}
         >
            {children}
         </ScrollView>
      ) : (
         <View style={[styles.viewContainer, style || null]}>{children}</View>
      )

      let leftIcon = null
      let rightIcon = null
      switch (headerType) {
         case 'drawer':
            leftIcon = (
               <TouchableIcon
                  onPress={navigation.openDrawer}
                  name='ios-menu'
                  style={styles.leftIcon}
               />
            )
            break
         case 'back':
            leftIcon = (
               <TouchableIcon
                  onPress={onPressIcon}
                  name='ios-arrow-round-back'
                  style={styles.leftIcon}
               />
            )
            break
         case 'modal':
            rightIcon = (
               <TouchableIcon
                  onPress={onPressIcon}
                  size={40}
                  name='ios-close'
                  style={styles.rightIcon}
               />
            )
            break
         case 'item':
            leftIcon = (
               <TouchableIcon
                  onPress={onPressIconLeft}
                  name='ios-arrow-round-back'
                  style={styles.leftIcon}
               />
            )
            rightIcon = (
               <TouchableIcon
                  onPress={onPressIconRight}
                  name='ios-trash'
                  style={styles.rightIcon}
               />
            )
            break
         default:
            leftComponent = null
            break
      }
      return (
         <View style={styles.container}>
            <Header
               containerStyle={styles.headerStyle}
               leftComponent={leftIcon}
               rightComponent={rightIcon}
               centerComponent={{ text: title, style: styles.headerText }}
            />
            {ViewType}
            {actionButtons && (
               <ActionButtons
                  openNewProperty={() => navigation.navigate('NewProperty')}
                  openNewItem={() => navigation.navigate('NewItem')}
                  openNewRequest={() => navigation.navigate('NewRequest')}
               />
            )}
         </View>
      )
   }
}

Page = withNavigation(Page)

export { Page }
