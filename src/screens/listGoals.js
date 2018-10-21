'use strict';

import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import { ListView, Tile, Title, Subtitle, Divider, Spinner } from '@shoutem/ui';

import Container from '../components/container';
import Button from '../components/Button';
import GoalListItem from '../components/goalListItem';
import { createGoal, getGoals } from '../actions/goalActions';
import Goal from '../model/goalModel';

class ListGoals extends Component {
  async componentDidMount() {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    console.log('Getting goals ->', user.uid);
    this.props.getGoals(user.uid, this.onError);
  }

  newGoal = async () => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    let goal = new Goal(user.uid, 'New New', new Date());
    goal.repeatInDays();
    goal.archive();

    this.props.createGoal(goal, this.onSuccess, this.onError);
  };

  onSuccess(user) {
    console.log(user);
  }

  onError(error) {
    console.log(error);
  }

  renderItem = ({ item }) => <GoalListItem id={item._id} item={item} />;

  render() {
    return (
      <Container>
        <FlatList
          style={{ flex: 1 }}
          data={this.props.goals}
          keyExtractor={(item, index) => item._id}
          renderItem={this.renderItem}
        />
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    isLoading: state.goalReducer.isLoading,
    goals: state.goalReducer.goals
  };
}

//Connect everything
export default connect(
  mapStateToProps,
  { createGoal, getGoals }
)(ListGoals);
