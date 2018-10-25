'use strict';

import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import { ListView, Tile, Title, Subtitle, Divider, Spinner } from '@shoutem/ui';

import Container from '../components/container';
import Button from '../components/Button';
import InputText from '../components/inputText';
import DateInput from '../components/dateInput';
import { createGoal } from '../actions/goalActions';
import Goal from '../model/goalModel';

class NewGoalFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: {},
      step: 0
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const goal = navigation.getParam('goal');
    const flowStep = navigation.getParam('step', 0);

    console.log({ goal });

    if (goal) {
      // exists goal on parameter
      let user = await AsyncStorage.getItem('user');
      user = JSON.parse(user);
      this.setState({ goal, step: flowStep });
    } else {
      // create a new goal
      this.setState({
        goal: new Goal(user.uid, '', new Date(), 'open').repeatInDays(),
        step: flowStep
      });
    }
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

  nextStep = async nextStep => {
    if (nextStep >= 3) {
      console.log('time to create a Goal');
      console.log(this.state);
      return;
    }

    this.props.navigation.navigate('NewGoalFlow', {
      step: nextStep,
      goal: this.state.goal
    });
  };

  updateGoalName = name => {
    const tempGoal = Object.assign({}, this.state.goal);
    tempGoal.name = name;

    this.setState({ goal: tempGoal });
  };

  updateGoalDate = date => {
    const tempGoal = Object.assign({}, this.state.goal);
    tempGoal.dtGoal = date;

    this.setState({ goal: tempGoal });
  };

  render() {
    const { navigation } = this.props;
    const flowStep = navigation.getParam('step', 0);
    const { goal } = this.state;

    return (
      <Container>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            padding: 20
          }}
        >
          {flowStep === 0 && (
            <View>
              <Text style={{ color: 'white', fontSize: 40 }}>EU</Text>
              <Text style={{ color: 'white', fontSize: 40 }}>QUERO</Text>
              <InputText
                style={{ marginLeft: 25 }}
                placeholder="Correr 5 Km..."
                onChange={value => this.updateGoalName(value)}
              />
            </View>
          )}

          {flowStep === 1 && (
            <View>
              <Text style={{ color: 'white', fontSize: 40 }}>TENHO ATÉ</Text>
              <DateInput
                defaultDate={goal.dtGoal}
                onChange={value => this.updateGoalDate(value)}
              />
              <Text style={{ color: 'white', fontSize: 40, marginLeft: 30 }}>
                PARA
              </Text>
              <Text style={{ color: '#232855', fontSize: 40, marginLeft: 10 }}>
                {goal.name ? goal.name.toUpperCase() : ''}
              </Text>
            </View>
          )}

          {flowStep === 2 && (
            <View>
              <Text style={{ color: 'white', fontSize: 40 }}>Me AJUDE</Text>
              <Text style={{ color: 'white', fontSize: 40 }}>
                A ATINGIR MINHA
              </Text>
              <Text style={{ color: 'white', fontSize: 40 }}>META</Text>
              <InputText
                style={{ marginLeft: 25 }}
                placeholder="Correr 5 Km..."
                onChange={value => this.updateGoalName(value)}
              />
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            padding: 20
          }}
        >
          <Button
            primary
            text=">>"
            onPress={() => this.nextStep(flowStep + 1)}
          />
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    newGoal: state.goalReducer.newGoal
  };
}

//Connect everything
export default connect(
  mapStateToProps,
  { createGoal }
)(NewGoalFlow);
