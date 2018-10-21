'use strict';

import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';

import Container from '../components/container';
import InputText from '../components/inputText';
import Button from '../components/Button';
import { register } from '../actions/authActions';

class SingUp extends Component {
  state = {
    username: null,
    email: null,
    password: null
  };

  singUp = () => {
    console.log(this.state);
    this.props.register(this.state, this.onSuccess, this.onError);
  };

  onSuccess(user) {
    console.log(user);
  }

  onError(error) {
    console.log(error);
  }

  render() {
    return (
      <Container>
        <Image
          style={{ width: 150, height: 150, marginVertical: 30 }}
          source={require('../assets/icon.png')}
        />
        <View>
          <InputText
            placeholder="Nome de Usuário"
            onChange={value => this.setState({ username: value })}
          />
          <InputText
            placeholder="Email"
            onChange={value => this.setState({ email: value })}
          />
          <InputText
            isSecure
            placeholder="Senha"
            onChange={value => this.setState({ password: value })}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 305
            }}
          >
            <Button
              text="ENTRAR"
              onPress={() => this.props.navigation.navigate('SingIn')}
            />
            <Button primary text="CADASTRAR" onPress={() => this.singUp()} />
          </View>
        </View>
      </Container>
    );
  }
}

//Connect everything
export default connect(
  null,
  { register }
)(SingUp);
