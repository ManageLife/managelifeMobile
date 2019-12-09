import React, { PureComponent } from 'react'
import { View, Image, Alert } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { KeyboardAwareScrollView as ScrollView } from 'react-native-keyboard-aware-scroll-view'
import ScrollableView from 'react-native-scrollable-tab-view'
import { connect } from 'react-redux'
import { createNewUserAPI, loginUserAPI } from '../../redux'
import {
   HeaderText,
   SmallText,
   Input,
   TouchableIcon,
   Button,
} from '../../components'
import { COLORS, DEVICE } from '../../config'
import { passwordSchema } from '../../utils'
import { styles } from './styles'
import { getAllUserDataAPI } from '../../redux/API/user'

class Login extends PureComponent {
   state = {
      isLoading: false,
      info: {
         firstName: '',
         lastName: '',
         email: '',
         phoneNumber: '',
         password: '',
      },
      tabPage: 0,
      tabLock: true,
      newUser: true,
   }

   _onChangeText = (text, type) => {
      this.setState(prevState => ({
         info: { ...prevState.info, [type]: text },
      }))
   }

   _handleScroll = async (direction, userType) => {
      await this.setState({ tabLock: false })
      this.setState({ tabPage: direction, tabLock: true, newUser: userType })
   }

   _loginValidation = () => {
      const { info, newUser } = this.state

      // Validate that all required fields are available
      const requiredInfo = [
         { value: 'email', display: 'Email' },
         { value: 'password', display: 'Password' },
      ]
      if (newUser) {
         requiredInfo.unshift(
            { value: 'firstName', display: 'First Name' },
            { value: 'lastName', display: 'Last Name' },
            { value: 'phoneNumber', display: 'Phone Number' },
         )
      }
      const errorArray = []

      requiredInfo.forEach(field => {
         if (!info[field.value] || !info[field.value].length) {
            errorArray.push(field.display)
         }
      })

      if (errorArray.length) {
         return `The following fields are required: ${errorArray.reduce(
            (accum, current) => accum + ', ' + current,
         )}`
      }

      // Validate that email is properly formatted
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!emailRegex.test(String(info.email).toLowerCase())) {
         return 'Please enter a valid email address.'
      }

      // Validate that password matches minimum requirements
      if (!passwordSchema.validate(info.password)) {
         return 'Password must be a minimum of 8 characters, contain at least one number, and not contain spaces.'
      }

      return false
   }

   _confirm = async () => {
      this.setState({ isLoading: true })
      const {
         loginUser,
         createNewUser,
         navigation,
         getAllUserData,
      } = this.props
      const { info, newUser } = this.state

      const loginValidation = await this._loginValidation()

      if (loginValidation) {
         Alert.alert('Login Error', loginValidation)
      } else {
         if (newUser) {
            await createNewUser(info, navigation)
         } else {
            await loginUser(info, navigation)
               .then(async res => {
                  let loginCheck = res
                  if (res) {
                     loginCheck = await getAllUserData(info.email)
                  }
                  return loginCheck
               })
               .then(res => {
                  if (res) {
                     navigation.navigate('Main')
                  }
               })
         }
      }
      this.setState({ isLoading: false })
   }

   render() {
      const { tabPage, tabLock, newUser, info, isLoading } = this.state
      const loginText = newUser
         ? 'Create an account to get started!'
         : 'Welcome back to ManageLife!'
      return (
         <ScrollableView
            style={styles.pageOne.container}
            renderTabBar={() => <View />}
            page={tabPage}
            locked={tabLock}
         >
            <View style={styles.pageOne.container}>
               <View style={styles.pageOne.upperContainer}>
                  <View style={styles.pageOne.welcomeRow}>
                     <View style={styles.pageOne.logoContainer}>
                        <Image
                           source={require('../../assets/images/logo-blue.png')}
                           style={styles.pageOne.logo}
                           resizeMode='contain'
                        />
                     </View>
                     <View style={styles.pageOne.textContainer}>
                        <HeaderText color={COLORS.SECONDARY}>
                           Welcome to ManageLife
                        </HeaderText>
                     </View>
                  </View>
               </View>
               <View style={styles.pageOne.lowerContainer}>
                  <Button
                     title='Create an Account'
                     onPress={() => this._handleScroll(1, true)}
                     style={styles.pageOne.buttonContainer}
                  />
                  <SmallText
                     color={COLORS.SECONDARY}
                     onPress={() => this._handleScroll(1, false)}
                  >
                     Or Log In
                  </SmallText>
               </View>
            </View>

            <ScrollView contentContainerStyle={styles.pageTwo.container}>
               <Spinner visible={isLoading} />
               <View style={styles.pageTwo.backIconContainer}>
                  <TouchableIcon
                     style={styles.pageTwo.backIcon}
                     name='md-arrow-back'
                     color={COLORS.SECONDARY}
                     onPress={() => this._handleScroll(0, true)}
                  />
               </View>
               <View style={styles.pageTwo.upperContainer}>
                  {newUser && (
                     <View style={styles.pageTwo.dualInputContainer}>
                        <Input
                           placeholder='First Name'
                           onChange={text =>
                              this._onChangeText(text, 'firstName')
                           }
                           width={DEVICE.width * 0.34}
                        />
                        <Input
                           placeholder='Last Name'
                           onChange={text =>
                              this._onChangeText(text, 'lastName')
                           }
                           width={DEVICE.width * 0.34}
                        />
                     </View>
                  )}
                  <View style={styles.pageTwo.inputContainer}>
                     <Input
                        placeholder='Email'
                        onChange={text => this._onChangeText(text, 'email')}
                        noCapitalize
                        style={{ marginVertical: 10 }}
                     />
                     {newUser && (
                        <Input
                           placeholder='Phone Number'
                           onChange={text =>
                              this._onChangeText(text, 'phoneNumber')
                           }
                           noCapitalize
                           style={{ marginVertical: 10 }}
                        />
                     )}
                     <Input
                        placeholder='Password'
                        onChange={text => this._onChangeText(text, 'password')}
                        noCapitalize
                        password
                        style={{ marginVertical: 10 }}
                     />
                  </View>
                  {!isLoading && (
                     <Button
                        title={this.state.newUser ? 'Create Account' : 'Log In'}
                        onPress={this._confirm}
                        style={styles.pageTwo.buttonContainer}
                     />
                  )}
               </View>
               <View style={styles.pageTwo.lowerContainer}>
                  <View style={styles.pageTwo.textContainer}>
                     <HeaderText color={COLORS.SECONDARY} lineHeight={40}>
                        {loginText}
                     </HeaderText>
                  </View>
               </View>
            </ScrollView>
         </ScrollableView>
      )
   }
}

const mapStateToProps = state => ({
   user: state.user,
})

const mapDispatchToProps = dispatch => ({
   createNewUser: (info, navigation) =>
      dispatch(createNewUserAPI(info, navigation)),
   loginUser: (info, navigation) => dispatch(loginUserAPI(info, navigation)),
   getAllUserData: loginEmail => dispatch(getAllUserDataAPI(loginEmail)),
})

Login = connect(
   mapStateToProps,
   mapDispatchToProps,
)(Login)
export { Login }
