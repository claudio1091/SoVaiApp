import React from 'react';
import { KeyboardAvoidingView } from 'react-native';

function Container({ children }) {
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        backgroundColor: '##F5F8FB',
      }}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

export default Container;
