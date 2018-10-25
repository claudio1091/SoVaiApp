import React from 'react';
import { Text, DatePickerAndroid } from 'react-native';
import Moment from 'moment';

function DateInput({
  defaultDate = new Date(),
  defaultFormat = 'DD/MM/YY',
  onChange
}) {
  openDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: defaultDate
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        if (onChange) onChange(new Date(year, month, day));
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  Moment.locale('pt-br');

  return (
    <Text
      style={{
        fontFamily: 'roboto-light',
        fontSize: 18,
        width: 305,
        height: 58,
        margin: 5,
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.45)',
        color: '#232855',
        textAlign: 'center',
        padding: 18
      }}
      onPress={this.openDatePicker}
    >
      {Moment(defaultDate).format(defaultFormat)}
    </Text>
  );
}

export default DateInput;
