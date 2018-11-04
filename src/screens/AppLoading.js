import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

import Container from '../components/Container';
import Loader from '../components/Loader';

class AppLoading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    // try read Storage and retrieve user
    const { navigation } = this.props;

    try {
      let user = await AsyncStorage.getItem('user');
      user = JSON.parse(user);

      if (user.uid && user.username) {
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
