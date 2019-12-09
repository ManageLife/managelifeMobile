import React from 'react'
import { Alert } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { connect } from 'react-redux'
import { logoutUserAPI } from '../../redux'
import { Page, Button } from '../../components'
import { styles } from './styles'

class Settings extends React.Component {
   state = { isLoading: false }

   _handleClick = () => {
      let { navigation } = this.props
      this.setState({ isLoading: true })
      this.props.logoutUser(navigation)
      this.setState({ isLoading: false })
   }

   _handleLogout = () => {
      const { logoutUser, navigation } = this.props

      Alert.alert('Are you sure you want to log out?', null, [
         {
            text: 'Cancel',
            style: 'cancel',
         },
         {
            text: 'Log Out',
            onPress: () => logoutUser(navigation),
         },
      ])
   }

   render() {
      let { isLoading } = this.state
      let { navigation, logoutUser } = this.props
      return (
         <Page
            title='Settings'
            headerType='drawer'
            scrollview
            style={styles.container}
         >
            {!isLoading && (
               <Button
                  title='Log Out'
                  style={styles.button}
                  onPress={this._handleLogout}
               />
            )}
            <Spinner visible={isLoading} />
         </Page>
      )
   }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
   logoutUser: navigation => dispatch(logoutUserAPI(navigation)),
})

Settings = connect(
   mapStateToProps,
   mapDispatchToProps,
)(Settings)
export { Settings }
