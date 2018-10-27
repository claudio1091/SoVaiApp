import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Spinner } from '@shoutem/ui';

import Container from '../components/Container';

class AppLoading extends Component {
  async componentDidMount() {
    // try read Storage and retrieve user
    const { navigation } = this.props;

    try {
      let user = await AsyncStorage.getItem('user');
      user = JSON.parse(user);
      console.log({ user });

      if (user.uid && user.username) {
        navigation.navigate('RootStack');
      } else {
        navigation.navigate('SingIn');
      }
    } catch (err) {
      navigation.navigate('SingIn');
    }
  }

  render() {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }
}

export default AppLoading;
