import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getAllUserDataAPI } from '../../../redux/API/user'

class AuthLoading extends PureComponent {
   async componentDidMount() {
      await this._checkLoginStatus()
   }

   _checkLoginStatus = async () => {
      const { userID, getAllUserData } = this.props
      getAllUserData()
      this.props.navigation.navigate(userID ? 'Main' : 'Login')
   }

   render() {
      return <View />
   }
}

const mapStateToProps = ({ user: localUser, firebase, firestore }) => {
   const { userID, email } = localUser
   const user = firestore.data[email]
   return {
      userID: userID,
      userEmail: firebase.auth.email,
      properties: user && user.properties ? Object.values(user.properties) : [],
      inventory: user && user.inventory ? Object.values(user.inventory) : [],
      requests: user && user.requests ? Object.values(user.requests) : [],
      requesting: firestore.status.requesting,
      requested: firestore.status.requested,
   }
}

const mapDispatchToProps = dispatch => ({
   getAllUserData: () => dispatch(getAllUserDataAPI()),
})

AuthLoading = compose(
   connect(
      mapStateToProps,
      mapDispatchToProps,
   ),
)(AuthLoading)

export { AuthLoading }
