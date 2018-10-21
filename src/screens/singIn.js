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

  renderItem({ item, index }) {
    return (
      <View style={styles.row}>
        <Text style={styles.title}>
          {parseInt(index) + 1}
          {'. '}
          {item.title}
        </Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  }
}

//Connect everything
export default connect(
  null,
  { login }
)(SingIn);

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },

  row: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10
  },

  title: {
    fontSize: 15,
    fontWeight: '600'
  },

  description: {
    marginTop: 5,
    fontSize: 14
  }
});
