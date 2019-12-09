import React, { PureComponent } from 'react'
import { View, TouchableOpacity } from 'react-native'
import Accordion from 'react-native-collapsible/Accordion'
import { SubheaderText, SmallText } from '../../resusable'
import { COLORS, SPACING } from '../../../config'
import { styles as cardStyles } from '../../resusable/Card/styles'
import { styles } from './styles'

class RoomInventory extends PureComponent {
   state = {
      activeSections: [],
   }

   _renderSectionTitle = () => {
      return <View />
   }

   _renderHeader = section => {
      const total = section.inventory.length
      const item = total === 1 ? 'Item' : 'Items'

      return (
         <View style={styles.headerContainer}>
            <SmallText bold color={COLORS.SECONDARY}>
               {section.title} {total ? `- ${total} ${item}` : ''}
            </SmallText>
         </View>
      )
   }

   _renderContent = section => {
      const { navigate } = this.props

      const content = section.inventory.map((item, index) => (
         <TouchableOpacity
            onPress={() => navigate(`InventoryDetails`, item)}
            key={item.id}
            style={[
               styles.contentContainer,
               {
                  borderColor: COLORS.GRAY,
                  borderTopWidth: index !== 0 ? 0.25 : 0,
                  borderBottomWidth:
                     index !== section.inventory.length - 1 ? 0.25 : 0,
               },
            ]}
         >
            <SmallText color={COLORS.BLACK}>
               {item.name} {item.category ? `(${item.category})` : null}
            </SmallText>
         </TouchableOpacity>
      ))
      return content
   }

   _updateSections = activeSections => {
      this.setState({ activeSections })
   }

   render() {
      const { sections, header } = this.props

      return (
         <View>
            <SubheaderText color={COLORS.SECONDARY}>{header}</SubheaderText>
            <Accordion
               sections={sections}
               activeSections={this.state.activeSections}
               renderSectionTitle={this._renderSectionTitle}
               renderHeader={this._renderHeader}
               renderContent={this._renderContent}
               onChange={this._updateSections}
               containerStyle={[cardStyles.container, styles.container]}
               touchableComponent={TouchableOpacity}
            />
         </View>
      )
   }
}

export { RoomInventory }
