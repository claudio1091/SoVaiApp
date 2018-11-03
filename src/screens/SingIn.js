import React, { Component } from 'react';
import { View, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import Button from '../components/Button';
import Container from '../components/Container';
import InputText from '../components/InputText';
import Loader from '../components/Loader';

import { login } from '../actions/authActions';

const Logo = styled.Image`
  height: 150;
  margin-vertical: 30;
  width: 150;
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

  onSingInSuccess = user => {
    const { navigation } = this.props;

    ToastAndroid.show(`Bem vindo ${user.username}`, ToastAndroid.SHORT);
    this.setState({ loading: false }, () => {
      navigation.navigate('ListScrn');
    });
  };

  onSingInError = error => {
    ToastAndroid.show(error.toString(), ToastAndroid.LONG);
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
          <InputText placeholder="Email" textValue={email} onChange={value => this.setState({ email: value })} />
          <InputText
            isSecure
            placeholder="Senha"
            textValue={password}
            onChange={value => this.setState({ password: value })}
          />
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
