import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { color } from '../styles/theme';

function Container(props) {
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        flexDirection: 'column'
      }}
    >
      <LinearGradient
        colors={color.gradientColors}
        style={{
          flex: 1,
          flexDirection: 'column'
        }}
      >
        {props.children}
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

export default Container;
