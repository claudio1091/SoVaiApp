'use strict';

import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { connect } from 'react-redux';

import Container from '../components/container';
import InputText from '../components/inputText';
import Button from '../components/Button';
import { login } from '../actions/authActions';

class SingIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null
    };

    this.renderItem = this.renderItem.bind(this);
  }

  navigateSingUp = () => {
    this.props.navigation.navigate('SingUp');
  };

  singIn = () => {
    console.log(this.state);
    this.props.login(this.state, this.onSuccess.bind(this), this.onError);
  };

  onSuccess(user) {
    console.log('user ->', user);
    this.props.navigation.navigate('ListScrn');
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
            <Button text="CADASTRAR" onPress={this.navigateSingUp} />
            <Button primary text="ENTRAR" onPress={() => this.singIn()} />
          </View>
        </View>
      </Container>
    );
  }
}

//Connect everything
export default connect(
  null,
  { login }
)(SingIn);
