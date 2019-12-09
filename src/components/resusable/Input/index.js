import React, { PureComponent } from 'react'
import { View, TouchableWithoutFeedback, TextInput, Text } from 'react-native'
import { styles } from './styles'
import { DEVICE } from '../../../config'

class Input extends PureComponent {
   state = { input: this.props.initialValue || '' }

   _onChange = input => {
      this.setState({ input })
      this.props.onChange(input)
   }

   render() {
      const {
         placeholder,
         inputPlaceholder,
         optional,
         autoCorrect,
         textStyle,
         password,
         noCapitalize,
         width,
         height,
         style,
         buttonComponent,
      } = this.props

      return (
         <TouchableWithoutFeedback onPress={() => this.ref.focus()}>
            <View style={[styles.outerContainer, style]}>
               <View style={styles.placeholderContainer}>
                  <Text style={styles.placeholderText}>{placeholder}</Text>
               </View>
               <View style={buttonComponent ? styles.rowWrapper : null}>
                  <View
                     style={[
                        styles.innerContainer,
                        {
                           width: width || DEVICE.width * 0.8,
                           height: height || null,
                           paddingVertical: height ? null : 12,
                        },
                     ]}
                     onPress
                  >
                     <TextInput
                        value={this.state.input}
                        onChangeText={this._onChange}
                        style={[styles.inputText, { ...textStyle }]}
                        autoCorrect={autoCorrect ? true : false}
                        autoCapitalize={noCapitalize ? 'none' : 'sentences'}
                        secureTextEntry={password}
                        multiline={height ? true : false}
                        ref={ref => (this.ref = ref)}
                        placeholder={optional ? 'Optional' : inputPlaceholder}
                     />
                  </View>
                  {buttonComponent && buttonComponent}
               </View>
            </View>
         </TouchableWithoutFeedback>
      )
   }
}

// Just a container that holds text that looks like the Input component
const InputPlaceholder = ({
   placeholder,
   textStyle,
   width,
   height,
   style,
   children,
}) => (
   <View style={[styles.outerContainer, style]}>
      <View style={styles.placeholderContainer}>
         <Text style={styles.placeholderText}>{placeholder}</Text>
      </View>
      <View
         style={[
            styles.innerContainer,
            {
               width: width || DEVICE.width * 0.8,
               height: height || null,
               paddingVertical: height ? null : 12,
            },
         ]}
         onPress
      >
         <Text style={[styles.inputText, { ...textStyle }]}>{children}</Text>
      </View>
   </View>
)

export { Input, InputPlaceholder }
