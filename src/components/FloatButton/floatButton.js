import React, { Component } from 'react';
import { TouchableOpacity, Animated, Easing, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Octicons';

const buttonDimension = 80;
const buttonRadius = 40;
const bottomPosition = 20;

const styles = StyleSheet.create({
  touchableStyles: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EE6C4D',
    right: 20,
    width: buttonDimension,
    height: buttonDimension,
    borderRadius: buttonRadius,
    elevation: 6,
    paddingLeft: 10,
  },
  addButton: {
    width: buttonDimension,
    height: buttonDimension,
    borderRadius: buttonRadius,
    alignItems: 'center',
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
      outputRange: [-100, bottomPosition],
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

FloatButton.propTypes = {
  iconName: PropTypes.string,
  primary: PropTypes.bool,
};

FloatButton.defaultProps = {
  iconName: 'plus',
  onPress: () => { },
};

export default FloatButton;
