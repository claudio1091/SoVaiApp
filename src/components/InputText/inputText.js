import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const componentHeight = 58;
const componentPadding = 18;
const componentWidth = 305;

const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.45);
  border-radius: 50;
  color: #232855;
  font-family: 'roboto-light';
  font-size: 18;
  height: ${componentHeight};
  margin-vertical: 5;
  margin-bottom: 5;
  margin-left: 5;
  margin-right: 5;
  margin-top: 5;
  padding-bottom: ${componentPadding};
  padding-left: ${componentPadding};
  padding-right: ${componentPadding};
  padding-top: ${componentPadding};
`;

const InputText = ({ placeholder, isSecure, onChange, textValue }) => {
  return (
    <Input
      autoCapitalize="none"
      placeholder={placeholder || ''}
      onChangeText={value => (onChange ? onChange(value) : null)}
      secureTextEntry={isSecure}
      returnKeyType={isSecure ? 'done' : 'default'}
      value={textValue}
    />
  );
};

InputText.propTypes = {
  placeholder: PropTypes.string,
  isSecure: PropTypes.bool,
  onChange: PropTypes.func,
  textValue: PropTypes.string,
};

InputText.defaultProps = {
  placeholder: '',
  isSecure: false,
  onChange: () => {},
  textValue: null,
};

export default InputText;
