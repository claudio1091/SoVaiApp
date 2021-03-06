import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { robotoWeights } from 'react-native-typography';

const buttonHeight = 50;
const borderRadius = 50;

const Button = props => {
  const { onPress, text, primary } = props;

  const TouchableContainer = styled.TouchableHighlight`
    border-radius: ${borderRadius};
    height: ${buttonHeight};
    margin-vertical: 5;
  `;

  const ButtonContainer = styled.View`
    align-items: center;
    background-color: ${primary ? '#EE6C4D' : 'transparent'};
    border-color: #ee6c4d;
    border-radius: ${borderRadius};
    border-width: ${primary ? 0 : 3};
    flex-direction: column;
    height: ${buttonHeight};
    justify-content: center;
  `;

  const ButtonText = styled.Text`
    ${robotoWeights.calloutObject};
    color: ${primary ? '#FFF' : '#EE6C4D'};
  `;

  return (
    <TouchableContainer
      underlayColor="#ffffff"
      activeOpacity={0.3}
      delayLongPress={3800}
      onPress={evt => (onPress ? onPress(evt) : null)}
      onLongPress={evt => (onPress ? onPress(evt) : null)}
    >
      <ButtonContainer>
        <ButtonText>{text.toUpperCase()}</ButtonText>
      </ButtonContainer>
    </TouchableContainer>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  primary: PropTypes.bool,
};

Button.defaultProps = {
  primary: false,
  text: 'Button Default',
  onPress: () => {},
};

export default Button;
