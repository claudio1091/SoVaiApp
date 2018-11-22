import React from 'react';
import { View } from 'react-native';

function Container({ children }) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5F8FB',
        padding: 10,
        paddingBottom: 2,
      }}
    >
      {children}
    </View>
  );
}

export default Container;
