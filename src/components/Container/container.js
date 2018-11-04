import React from 'react';
import { KeyboardAvoidingView } from 'react-native';

function Container({ children }) {
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '##F5F8FB',
        padding: 10,
      }}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

export default Container;
