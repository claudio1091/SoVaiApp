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
