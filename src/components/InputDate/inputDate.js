import React from 'react';
import { DatePickerAndroid } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Moment from 'moment';

const componentHeight = 50;
const componentPadding = 18;
const componentWidth = 305;

const DateText = styled.Text`
  background-color: 'rgba(255, 255, 255, 0.45)';
  border-radius: 10;
  color: '#232855';
  font-family: 'roboto-light';
  font-size: 18;
  height: ${componentHeight};
  margin-vertical: 5;
  margin: 5;
  padding: ${componentPadding};
  text-align: 'center';
  width: ${componentWidth};
`;

const InputDate = ({ defaultDate, defaultFormat, onChange }) => {
  const openDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Month 0 is January.
        date: defaultDate,
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

  return <DateText onPress={openDatePicker}>{Moment(defaultDate).format(defaultFormat)}</DateText>;
};

InputDate.propTypes = {
  defaultDate: PropTypes.object,
  defaultFormat: PropTypes.string,
  onChange: PropTypes.func,
};

InputDate.defaultProps = {
  defaultDate: new Date(),
  defaultFormat: 'DD/MM/YYYY',
  onChange: () => {},
};

export default InputDate;
