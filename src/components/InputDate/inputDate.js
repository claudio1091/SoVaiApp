import React from 'react';
import { DatePickerAndroid, ToastAndroid } from 'react-native';
import PropTypes from 'prop-types';
import Moment from 'moment';
import styled from 'styled-components/native';
import { robotoWeights } from 'react-native-typography';

const borderRadius = 50;
const componentHeight = 58;
const componentPadding = 18;

const DateText = styled.Text`
  ${robotoWeights.lightObject};
  background-color: rgba(255, 255, 255, 0.45);
  border-radius: ${borderRadius};
  color: #232855;
  font-size: 18;
  height: ${componentHeight};
  margin-bottom: 5;
  margin-left: 5;
  margin-right: 5;
  margin-top: 5;
  padding-bottom: ${componentPadding};
  padding-left: ${componentPadding};
  padding-right: ${componentPadding};
  padding-top: ${componentPadding};
  text-align: center;
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
      ToastAndroid.show('Houve um problema ao selecionar a data.', ToastAndroid.SHORT);
    }
  };

  Moment.locale('pt-br');

  return <DateText onPress={openDatePicker} >{Moment(defaultDate).format(defaultFormat)}</DateText>;
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
