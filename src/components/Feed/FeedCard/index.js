import React, { PureComponent } from 'react'
import { View, TouchableOpacity, Alert } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Accordion from 'react-native-collapsible/Accordion'
import moment from 'moment'
import { Ionicons as Icon } from '@expo/vector-icons'
import { deleteRequestAPI } from '../../../redux/API/requests'
import { SubheaderText, SmallText } from '../../resusable'
import { COLORS, SPACING } from '../../../config'
import { styles as cardStyles } from '../../resusable/Card/styles'
import { styles } from './styles'

class FeedCard extends PureComponent {
   state = {
      activeSections: [],
   }

   _deleteRequest = (requestId, propertyId) => {
      const { deleteRequest } = this.props

      Alert.alert('Cancel this request?', null, [
         {
            text: 'Cancel',
            style: 'cancel',
         },
         {
            text: 'Yes',
            onPress: () => deleteRequest(requestId, propertyId),
         },
      ])
   }

   _renderSectionTitle = () => <View />

   _renderHeader = request => {
      const newRequest = moment().diff(moment(request.date), 'm') <= 1440

      return (
         <View style={styles.headerContainer}>
            {newRequest && (
               <Icon
                  name='ios-clock'
                  size={20}
                  color={COLORS.SECONDARY}
                  style={{ marginRight: 10 }}
               />
            )}
            <SmallText bold color={COLORS.SECONDARY}>
               {request.title}
            </SmallText>
         </View>
      )
   }

   _renderContent = request => {
      return (
         <TouchableOpacity
            style={styles.contentContainer}
            onPress={() => this._deleteRequest(request.id, request.propertyId)}
         >
            <SmallText textAlign='center' color={COLORS.BLACK}>
               {request.description}
            </SmallText>
         </TouchableOpacity>
      )
   }

   _updateSections = activeSections => {
      this.setState({ activeSections })
   }

   render() {
      const { sections, header, iconName, noBold, onPressHeader } = this.props

      return (
         <View style={styles.wrapper}>
            <TouchableOpacity
               style={styles.titleContainer}
               onPress={onPressHeader}
            >
               {iconName && (
                  <Icon
                     name={iconName}
                     size={30}
                     color={COLORS.SECONDARY}
                     style={{ marginRight: 10 }}
                  />
               )}
               <SubheaderText
                  bold={noBold ? false : true}
                  light={noBold ? true : false}
                  color={COLORS.SECONDARY}
               >
                  {header}
               </SubheaderText>
            </TouchableOpacity>
            {sections ? (
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
            ) : (
               <View
                  style={[
                     cardStyles.container,
                     styles.container,
                     styles.noContentContainer,
                  ]}
               >
                  <Icon
                     name='ios-thumbs-up'
                     size={25}
                     color={COLORS.SECONDARY}
                     style={{ marginRight: 10 }}
                  />
                  <SmallText color={COLORS.SECONDARY}>
                     Nothing to report!
                  </SmallText>
               </View>
            )}
         </View>
      )
   }
}

const mapDispatchToProps = dispatch => ({
   deleteRequest: (requestId, propertyId) =>
      dispatch(deleteRequestAPI(requestId, propertyId)),
})

FeedCard = compose(
   connect(
      null,
      mapDispatchToProps,
   ),
)(FeedCard)

export { FeedCard }
