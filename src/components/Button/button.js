import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const buttonHeight = 50;
const buttonWidth = 137;

const TouchableContainer = styled.TouchableHighlight`
  border-radius: 10;
  height: ${buttonHeight};
  margin-vertical: 5;
  width: ${buttonWidth};
`;

const ButtonContainer = styled.View`
  align-items: 'center';
  background-color: ${props => (props.primary ? '#EE6C4D' : 'transparent')};
  border-color: '#EE6C4D';
  border-radius: 10;
  border-width: ${props => (props.primary ? 0 : 3)};
  flex-direction: 'column';
  height: ${buttonHeight};
  justify-content: 'center';
  width: ${buttonWidth};
`;

const ButtonText = styled.Text`
  color: '#FFF';
  font-family: 'roboto-light';
  font-size: 16;
  font-weight: '300';
`;

const Button = ({ text, onPress }) => {
  return (
    <TouchableContainer
      underlayColor="#ffffff"
      activeOpacity={0.3}
      delayLongPress={3800}
      onPress={evt => (onPress ? onPress(evt) : null)}
      onLongPress={evt => (onPress ? onPress(evt) : null)}
    >
      <ButtonContainer>
        <ButtonText>{text}</ButtonText>
      </ButtonContainer>
    </TouchableContainer>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  primary: PropTypes.bool,
};

Button.defaultProps = {
  primary: true,
};

export default Button;
