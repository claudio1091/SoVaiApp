import React, { Component } from 'react';
import { View, TouchableOpacity, Animated, Easing, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

const styles = StyleSheet.create({
  touchableStyles: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EE6C4D',
    right: 20,
    width: 90,
    height: 90,
    borderRadius: 45,
    elevation: 6,
    paddingLeft: 10,
  },
  addButton: {
    // backgroundColor: '#EE6C4D',
    width: 80,
    height: 80,
    borderRadius: 40,
    // flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    // padding: 22,
    // elevation: 6,
  },
});

class FloatButton extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.quad),
      delay: 1000,
    }).start();
  }

  render() {
    const bottom = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 20],
    });

    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    const { iconName, onPress } = this.props;

    return (
      <AnimatedTouchable
        activeOpacity={1}
        underlayColor="#424242"
        onPress={evt => (onPress ? onPress(evt) : null)}
        style={[styles.touchableStyles, { bottom }]}
      >
        <Icon name={iconName} size={40} color="white" />
      </AnimatedTouchable>
    );
  }
}

export default FloatButton;
