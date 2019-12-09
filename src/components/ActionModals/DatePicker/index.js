import React, { PureComponent } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
import { DEVICE } from '../../../config'
import { styles } from './styles'

const startTime = moment()
   .endOf('d')
   .add(9, 'h')
   .add(1, 'm')

class DatePicker extends PureComponent {
   state = {
      visible: false,
      displayValue: startTime.format('MMM Do YYYY, h:mm a'),
      value: startTime.toDate(),
   }

   _togglePicker = () => {
      this.setState(prevState => ({ visible: !prevState.visible }))
   }

   _selectTime = input => {
      const displayValue = moment(input).format('MMM Do YYYY, h:mm a')
      this.setState({ displayValue, value: input })
      this.props.onConfirm(input)

      this._togglePicker()
   }

   render() {
      const { placeholder, width, height } = this.props
      const { displayValue, visible } = this.state

      return (
         <View style={styles.outerContainer}>
            <View style={styles.placeholderContainer}>
               <Text style={styles.placeholderText}>{placeholder}</Text>
            </View>
            <TouchableOpacity
               onPress={this._togglePicker}
               style={[
                  styles.innerContainer,
                  {
                     width: width || DEVICE.width * 0.8,
                     paddingVertical: height ? null : 12,
                  },
               ]}
            >
               <Text style={styles.inputText}>{displayValue}</Text>
            </TouchableOpacity>
            <DateTimePicker
               mode='datetime'
               minuteInterval={5}
               isVisible={visible}
               onConfirm={input => this._selectTime(input)}
               onCancel={this._togglePicker}
               minimumDate={new Date()}
               date={startTime.toDate()}
               datePickerContainerStyleIOS={styles.darkModeContainer}
            />
         </View>
      )
   }
}

export { DatePicker }
