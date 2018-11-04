import React, { Component } from 'react';
import { AsyncStorage, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Container from '../components/Container';
import ListItemGoal from '../components/ListItemGoal';
import FloatButton from '../components/FloatButton';

import { createGoal, getGoals } from '../actions/goalActions';

class ListGoals extends Component {
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
    const { goals } = this.props;

    return (
      <Container>
        <FlatList style={{ flex: 1 }} data={goals} keyExtractor={item => item.id} renderItem={this.renderItem} />
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
