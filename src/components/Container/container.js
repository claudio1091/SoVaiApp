import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import { color } from '../../styles/theme';

function Container({ children, center }) {
  const Content = styled.KeyboardAvoidingView`
    flex: 1;
    flex-direction: column;
    align-content: center;
  `;

  return (
    <Content>
      <LinearGradient
        colors={color.gradientColors}
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </LinearGradient>
    </Content>
  );
}

Container.propTypes = {
  children: PropTypes.array,
  center: PropTypes.bool,
};

Container.defaultTypes = {
  center: false,
};

export default Container;
