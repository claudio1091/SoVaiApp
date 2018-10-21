import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';

function Button({ text, primary, onPress }) {
  return (
    <TouchableHighlight
      style={{
        width: 137,
        height: 50,
        borderRadius: 10,
        marginVertical: 5
      }}
      underlayColor="#ffffff"
      activeOpacity={0.3}
      delayLongPress={3800}
      onPress={evt => (onPress ? onPress(evt) : null)}
      onLongPress={evt => (onPress ? onPress(evt) : null)}
    >
      <View
        style={{
          backgroundColor: primary ? '#EE6C4D' : 'transparent',
          width: 137,
          height: 50,
          borderRadius: 10,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text
          style={{
            fontFamily: 'roboto-light',
            fontWeight: '300',
            fontSize: 16,
            color: '#FFF'
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

export default Button;
