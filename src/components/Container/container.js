import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import { color } from '../../styles/theme';

const Content = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
`;

function Container({ children }) {
  return (
    <Content>
      <LinearGradient
        colors={color.gradientColors}
        style={{
          flex: 1,
          flexDirection: 'column',
        }}
      >
        {children}
      </LinearGradient>
    </Content>
  );
}

Container.propTypes = {
  children: PropTypes.array,
};

export default Container;
