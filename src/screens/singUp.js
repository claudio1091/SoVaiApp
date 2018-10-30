import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import Container from '../components/Container';
import InputText from '../components/InputText';
import Button from '../components/Button';
import { register } from '../actions/authActions';

const Logo = styled.Image`
  height: 150;
  margin-vertical: 30;
  width: 150;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 305;
`;

class SingUp extends Component {
  state = {
    username: null,
    email: null,
    password: null,
  };

  onSuccess(user) {
    console.log(user);
  }

  onError(error) {
    console.log(error);
  }

  singUp = () => {
    const { register } = this.props;
    register(this.state, this.onSuccess, this.onError);
  };

  render() {
    const { navigation } = this.props;

    return (
      <Container>
        <Logo source={require('../assets/icon.png')} />
        <View>
          <InputText placeholder="Nome de Usuário" onChange={value => this.setState({ username: value })} />
          <InputText placeholder="Email" onChange={value => this.setState({ email: value })} />
          <InputText isSecure placeholder="Senha" onChange={value => this.setState({ password: value })} />

          <ButtonsContainer>
            <Button text="ENTRAR" onPress={() => navigation.navigate('SingIn')} />
            <Button primary text="CADASTRAR" onPress={() => this.singUp()} />
          </ButtonsContainer>
        </View>
      </Container>
    );
  }
}

SingUp.propTypes = {
  register: PropTypes.any.isRequired,
  navigation: PropTypes.any.isRequired,
};

// Connect everything
export default connect(
  null,
  { register },
)(SingUp);
