import React from 'react';
import { TextInput } from '@shoutem/ui';

function InputText({ placeholder, isSecure, onChange }) {
  return (
    <TextInput
      style={{
        fontFamily: 'roboto-light',
        fontSize: 18,
        width: 305,
        height: 58,
        margin: 5,
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.45)',
        color: '#232855'
      }}
      autoCapitalize="none"
      placeholder={placeholder || ''}
      onChangeText={value => (onChange ? onChange(value) : null)}
      secureTextEntry={isSecure}
      returnKeyType={isSecure ? 'done' : 'default'}
    />
  );
}

export default InputText;
