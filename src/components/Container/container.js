import React from 'react';
import { View } from 'react-native';

function Container({ children }) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#dee0e2',
        padding: 10,
        paddingBottom: 2,
      }}
    >
      {children}
    </View>
  );
}

export default Container;
