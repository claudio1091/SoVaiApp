import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';

import Container from '../components/Container';
import Loader from '../components/Loader';

class AppLoading extends Component {
  state = {
    loading: true,
  };

  async componentDidMount() {
    // try read Storage and retrieve user
    const { navigation } = this.props;

    try {
      let user = await AsyncStorage.getItem('user');
      user = await JSON.parse(user);

      await this.notificationPermission();

      if (user && user.uid && user.username) {
        this.setState({ loading: false }, () => {
          navigation.navigate('RootStack');
        });
      } else {
        this.setState({ loading: false }, () => {
          navigation.navigate('SingIn');
        });
      }
    } catch (err) {
      this.setState({ loading: false }, () => {
        navigation.navigate('SingIn');
      });
    }
  }

  notificationPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      await firebase.messaging().requestPermission();

      // Build a channel
      const channel = new firebase.notifications.Android.Channel(
        'so-vai-main-channel',
        'Main Channel',
        firebase.notifications.Android.Importance.Max,
      ).setDescription('Main Channel');

      // Create the channel
      firebase.notifications().android.createChannel(channel);
    } else {
      console.log('Notification permission denied');
    }
  };

  render() {
    const { loading } = this.state;

    return (
      <Container>
        <Loader loading={loading} />
      </Container>
    );
  }
}

export default AppLoading;
