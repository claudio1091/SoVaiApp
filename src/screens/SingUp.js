import React, { Component } from 'react';
import { View, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import Container from '../components/Container';
import InputText from '../components/InputText';
import Button from '../components/Button';
import Loader from '../components/Loader';

import { register } from '../actions/authActions';

const Logo = styled.Image`
  height: 150;
  margin-vertical: 30;
  width: 150;
`;

class SingUp extends Component {
  state = {
    username: null,
    email: null,
    password: null,
    loading: false,
  };

  onSuccess = () => {
    const { navigation } = this.props;

    ToastAndroid.show('Usuário criado com sucesso.', ToastAndroid.SHORT);
    this.setState({ loading: false }, () => {
      navigation.navigate('SingIn');
    });
  };

  onError = error => {
    ToastAndroid.show(error.toString(), ToastAndroid.LONG);
  };

  singUp = () => {
    const { register } = this.props;

    this.setState({ loading: true }, () => {
      register(this.state, this.onSuccess, this.onError);
    });
  };

  render() {
    const { navigation, loading } = this.props;

    return (
      <Container>
        <Loader loading={loading} />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Logo source={require('../assets/icon.png')} />
          </View>
          <InputText placeholder="Nome de Usuário" onChange={value => this.setState({ username: value })} />
          <InputText placeholder="Email" onChange={value => this.setState({ email: value })} />
          <InputText isSecure placeholder="Senha" onChange={value => this.setState({ password: value })} />
        </View>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
          }}
        >
          <Button text="ENTRAR" onPress={() => navigation.navigate('SingIn')} />
          <Button primary text="CADASTRAR" onPress={() => this.singUp()} />
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
