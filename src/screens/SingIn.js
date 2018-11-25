import React, { Component } from 'react';
import { View, ToastAndroid, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import Button from '../components/Button';
import Container from '../components/Container';
import Loader from '../components/Loader';
import FormTextInput from '../components/FormTextInput';

import { login } from '../actions/authActions';

const Logo = styled.Image`
  height: 120;
  margin-vertical: 30;
  width: 120;
`;

class SingIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      loading: false,
    };
  }

  onSingInSuccess = data => {
    const { navigation } = this.props;

    ToastAndroid.show(`Bem vindo ${data.user.username}`, ToastAndroid.SHORT);
    this.setState({ loading: false }, () => {
      navigation.navigate('ListScrn');
    });
  };

  onSingInError = error => {
    this.setState({ loading: false }, () => {
      ToastAndroid.show(error.toString(), ToastAndroid.LONG);
    });
  };

  navigateToSingUp = () => {
    const { navigation } = this.props;
    navigation.navigate('SingUp');
  };

  singIn = () => {
    const { login } = this.props;

    this.setState({ loading: true }, () => {
      login(this.state, this.onSingInSuccess.bind(this), this.onSingInError);
    });
  };

  render() {
    const { email, password, loading } = this.state;

    return (
      <Container>
        <Loader loading={loading} color="#DB4437" />
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

          <KeyboardAvoidingView>
            <FormTextInput
              autoCapitalize="none"
              placeholder="Email"
              textValue={email}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.secondTextInput.focus();
              }}
              blurOnSubmit={false}
              onChangeText={value => this.setState({ email: value })}
            />

            <FormTextInput
              autoCapitalize="none"
              secureTextEntry
              placeholder="Senha"
              textValue={password}
              ref={input => {
                this.secondTextInput = input;
              }}
              onSubmitEditing={() => {
                this.singIn();
              }}
              returnKeyType="done"
              onChangeText={value => this.setState({ password: value })}
            />
          </KeyboardAvoidingView>
        </View>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
          }}
        >
          <Button text="CADASTRAR" onPress={this.navigateToSingUp} />
          <Button primary text="ENTRAR" onPress={() => this.singIn()} />
        </View>
      </Container>
    );
  }
}

SingIn.propTypes = {
  login: PropTypes.any.isRequired,
  navigation: PropTypes.any.isRequired,
};

// Connect everything
export default connect(
  null,
  { login },
)(SingIn);
