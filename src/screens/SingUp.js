import React, { Component } from 'react';
import { View, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import Container from '../components/Container';
import FormTextInput from '../components/FormTextInput';
import Button from '../components/Button';
import Loader from '../components/Loader';

import { register } from '../actions/authActions';

const Logo = styled.Image`
  height: 120;
  margin-vertical: 30;
  width: 120;
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
    this.setState({ loading: false }, () => {
      ToastAndroid.show(error.toString(), ToastAndroid.LONG);
    });
  };

  singUp = () => {
    const { register } = this.props;

    this.setState({ loading: true }, () => {
      register(this.state, this.onSuccess, this.onError);
    });
  };

  render() {
    const { navigation } = this.props;
    const { username, email, password, loading } = this.state;

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
          <FormTextInput
            placeholder="Nome"
            textValue={username}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              this.secondTextInput.focus();
            }}
            onChangeText={value => this.setState({ username: value })}
          />
          <FormTextInput
            autoCapitalize="none"
            placeholder="Email"
            textValue={email}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              this.thirdTextInput.focus();
            }}
            ref={input => {
              this.secondTextInput = input;
            }}
            onChangeText={value => this.setState({ email: value })}
          />
          <FormTextInput
            secureTextEntry
            autoCapitalize="none"
            placeholder="Senha"
            textValue={password}
            returnKeyType="done"
            onSubmitEditing={() => {
              this.singUp();
            }}
            ref={input => {
              this.thirdTextInput = input;
            }}
            onChangeText={value => this.setState({ password: value })}
          />
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
