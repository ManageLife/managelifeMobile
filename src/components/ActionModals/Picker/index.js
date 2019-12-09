import React, { PureComponent } from 'react'
import { View, TextInput, Text } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { styles } from './styles'
import { DEVICE, COLORS } from '../../../config'

class Picker extends PureComponent {
   state = { value: this.props.initialValue || null }

   _onChange = value => {
      this.setState({ value })
      this.props.onChange(value)
   }

   _onDone = () => {
      const { value } = this.state
      this.props.onChange(value)
   }

   render() {
      const {
         placeholder,
         pickerPlaceholder,
         textStyle,
         width,
         items,
         disabled,
         addNewLabel,
      } = this.props
      const { value } = this.state

      const options = addNewLabel
         ? [...items, { label: addNewLabel, value: 'addNew' }]
         : [...items]

      return (
         <View style={styles.outerContainer}>
            <View style={styles.placeholderContainer}>
               <Text style={styles.placeholderText}>{placeholder}</Text>
            </View>
            <View
               style={[
                  styles.innerContainer,
                  { width: width || DEVICE.width * 0.8 },
               ]}
            >
               <RNPickerSelect
                  value={value}
                  onValueChange={this._onChange}
                  onDonePress={this._onDone}
                  items={options}
                  disabled={disabled}
                  placeholder={{
                     label: pickerPlaceholder,
                     value: null,
                     color: '#9EA0A4',
                  }}
                  style={{
                     inputIOS: [styles.inputText, { ...textStyle }],
                     inputAndroid: [styles.inputText, { ...textStyle }],
                  }}
               />
            </View>
         </View>
      )
   }
}

export { Picker }
