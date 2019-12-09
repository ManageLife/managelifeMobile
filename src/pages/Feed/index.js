import React, { PureComponent } from 'react'
import { View, Alert } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import {
   Page,
   Card,
   RequestsList,
   SubheaderText,
   CardButton,
} from '../../components'
import { COLORS } from '../../config'
import { styles } from './styles'
import { getAllUserDataAPI } from '../../redux/API/user'
import { deleteRequestAPI } from '../../redux/API/requests'

class Feed extends PureComponent {
   componentDidMount() {
      this.props.getAllUserData()
   }

   _filterRequests = (properties, requests) => {
      let requestsArray = null

      if (properties.length) {
         const requestsObj = properties.reduce((obj, property) => {
            obj[property.name] = { propertyName: property.name, requests: [] }

            return obj
         }, {})

         if (requests.length) {
            requests.forEach(request => {
               const { id } = request
               const propertyName = request.property.name
               const propertyRequests = requestsObj[propertyName].requests
               let title
               let description

               if (request.status === 'processing') {
                  title = `${request.item.name} - Request Processing`
                  description = `We're currently processing your request for the following item: ${
                     request.item.name
                  }. We'll try to have a technician out there by ${moment(
                     request.date,
                  ).format('MMM Do, h:mm a')}.`
               }

               propertyRequests.push({
                  title,
                  description,
                  id,
                  propertyId: request.property.id,
               })
               requestsObj[propertyName] = {
                  requests: propertyRequests,
                  propertyName,
               }
            })
         }

         requestsArray = Object.values(requestsObj)
      }

      return requestsArray
   }

   _displayFeed = () => {
      const { properties, requests, navigation } = this.props
      const filteredRequests = this._filterRequests(properties, requests)

      return (
         <RequestsList navigation={navigation} requestInfo={filteredRequests} />
      )
   }

   _comingSoon = () => {
      Alert.alert(
         'Feature coming soon!',
         'Be on the lookout for more ManageLife features.',
      )
   }

   render() {
      return (
         <Page
            title='Feed'
            headerType='drawer'
            style={styles.container}
            scrollview
            actionButtons
         >
            <View style={styles.upperContainer}>
               <Card style={styles.dashboardContainer}>
                  <SubheaderText
                     bold
                     textAlign='center'
                     color={COLORS.SECONDARY}
                  >
                     Your ManageLife Dashboard
                  </SubheaderText>
               </Card>
            </View>
            <View style={styles.lowerContainer}>{this._displayFeed()}</View>
            <View style={styles.cardButtonRow}>
               <CardButton
                  onPress={this._comingSoon}
                  style={styles.cardButton}
                  title='Family'
                  iconName='ios-people'
               />
               <CardButton
                  onPress={this._comingSoon}
                  style={styles.cardButton}
                  title='Auto'
                  iconName='ios-car'
               />
            </View>
         </Page>
      )
   }
}

const mapStateToProps = state => {
   return {
      userEmail: state.user.email,
      properties: Object.values(state.properties) || [],
      inventory: Object.values(state.inventory) || [],
      requests: Object.values(state.requests) || [],
   }
}

const mapDispatchToProps = dispatch => ({
   deleteRequest: requestId => dispatch(deleteRequestAPI(requestId)),
   getAllUserData: () => dispatch(getAllUserDataAPI()),
})

Feed = compose(
   connect(
      mapStateToProps,
      mapDispatchToProps,
   ),
)(Feed)

export { Feed }
