import React, { Component } from 'react';
import { AsyncStorage, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';

import Container from '../components/Container';
import Loader from '../components/Loader';
import ListItemGoal from '../components/ListItemGoal';
import FloatButton from '../components/FloatButton';

import { createGoal, getGoals } from '../actions/goalActions';

class ListGoals extends Component {
  static navigationOptions = {
    title: 'Suas Metas',
  };

  async componentDidMount() {
    const { getGoals } = this.props;
    let user = await AsyncStorage.getItem('user');

    user = JSON.parse(user);
    getGoals(user.uid, this.onError);

    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed(notification => {
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      console.log('onNotificationDisplayed ->', notification);
    });

    this.notificationListener = firebase.notifications().onNotification(notification => {
      // Process your notification as required
      // app no primeiro plano
      console.log('onNotification ->', notification);
      // Display the notification
      firebase.notifications().displayNotification(notification);
    });

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened(notificationOpen => {
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      const notification = notificationOpen.notification;

      console.log('onNotificationOpened ->', { action, notification });
      if (notification.data && notification.data.id) {
        this.navigateDetail(notification.data);
      }
    });

    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      // App was opened by a notification
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      const notification = notificationOpen.notification;

      console.log('getInitialNotification ->', { action, notification });
    }
  }

  componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
  }

  onError(error) {
    console.log(error);
  }

  createNewGoal = () => {
    const { navigation } = this.props;

    navigation.navigate('Step1');
  };

  navigateDetail = item => {
    const { navigation } = this.props;

    navigation.navigate('GoalDetail', { goal: item });
  };

  renderItem = ({ item }) => <ListItemGoal id={item.id} item={item} onPress={item => this.navigateDetail(item)} />;

  render() {
    const { isLoading, goals } = this.props;
    const Banner = firebase.admob.Banner;

    return (
      <Container>
        <Loader loading={isLoading} />
        <FlatList
          style={{ flex: 1 }}
          data={goals}
          keyExtractor={item => item.id || item.name}
          renderItem={this.renderItem}
        />
        <View style={{ justifyContent: 'center' }}>
          <Banner
            unitId="ca-app-pub-5398707650805959/3265688402"
            size="BANNER"
            onAdLoaded={() => {
              console.log('Advert loaded');
            }}
          />
        </View>
        <FloatButton iconName="plus" onPress={() => this.createNewGoal()} />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.goalReducer.isLoading,
    goals: state.goalReducer.goals,
  };
}

ListGoals.propTypes = {
  goals: PropTypes.array,
  navigation: PropTypes.object.isRequired,
  getGoals: PropTypes.func.isRequired,
};

// Connect everything
export default connect(
  mapStateToProps,
  { createGoal, getGoals },
)(ListGoals);
