import React, { Component } from 'react';
import { View, AsyncStorage, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Moment from 'moment';

import Container from '../components/Container';
import Button from '../components/Button';
import InputText from '../components/InputText';
import InputDate from '../components/InputDate';

import { createGoal } from '../actions/goalActions';
import Goal from '../model/goalModel';

const NormalText = styled.Text`
  color: white;
  font-size: 40;
  font-weight: 300;
`;

const HighlightText = styled(NormalText)`
  color: #232855;
`;

const placeholdersExamples = ['Correr 5km', 'Perder 5kg', 'Ir á academia todos os dias', 'Economizar 5 Reais'];

class NewGoalFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: new Goal({ status: 'open' }),
    };
  }

  onSuccess(user) {
    const { navigation } = this.props;
    navigation.navigate('ListScrn');
  }

  onError(error) {
    console.log(error);
  }

  persistGoal = async () => {
    try {
      const { createGoal } = this.props;
      const { goal } = this.state;

      let user = await AsyncStorage.getItem('user');
      user = await JSON.parse(user);

      const goalSave = new Goal();
      goalSave.inflate(goal);

      goalSave.userId = user.uid;
      goalSave.repeatInDays();

      createGoal(goalSave, this.onSuccess, this.onError);
    } catch (err) {
      console.warn(err);
    }
  };

  nextStep = async nextStep => {
    const { goal } = this.state;
    const { navigation } = this.props;

    if (nextStep >= 3) {
      // save the goal
      return this.persistGoal();
    }

    return navigation.navigate('NewGoalFlow', {
      step: nextStep,
      goal,
    });
  };

  updateGoalName = name => {
    const { goal } = this.state;
    const tempGoal = Object.assign({}, goal);
    tempGoal.name = name;

    this.setState({ goal: tempGoal });
  };

  updateGoalDate = date => {
    const { goal } = this.state;
    const tempGoal = Object.assign({}, goal);
    tempGoal.dtGoal = date;

    this.setState({ goal: tempGoal });
  };

  render() {
    const { navigation } = this.props;
    const flowStep = navigation.getParam('step', 0);
    const { goal } = this.state;

    const placeholderIndex = Math.floor(Math.random() * placeholdersExamples.length);

    return (
      <Container>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            padding: 20,
          }}
        >
          {flowStep === 0 && (
            <View>
              <NormalText>EU</NormalText>
              <NormalText>QUERO</NormalText>
              <InputText
                placeholder={placeholdersExamples[placeholderIndex]}
                textValue={goal.name || ''}
                onChange={value => this.updateGoalName(value)}
              />
            </View>
          )}

          {flowStep === 1 && (
            <View>
              <NormalText>TENHO ATÉ</NormalText>
              <InputDate defaultDate={goal.dtGoal} onChange={value => this.updateGoalDate(value)} />
              <Text style={{ color: 'white', fontSize: 40, marginLeft: 30 }}>PARA</Text>
              <HighlightText>{goal.name ? goal.name.toUpperCase() : ''}</HighlightText>
            </View>
          )}

          {flowStep === 2 && (
            <View>
              <NormalText>TE MOTIVAREMOS DIARIAMENTE</NormalText>
              <Text style={{ color: 'white', fontSize: 40, marginLeft: 20 }}>A ATINGIR SUA</Text>
              <NormalText>META DE</NormalText>
              <HighlightText>{goal.name ? goal.name.toUpperCase() : ''}</HighlightText>
              <NormalText>ATÉ</NormalText>
              <HighlightText>{goal.dtGoal ? Moment(goal.dtGoal).format('DD/MM/YYYY') : ''}</HighlightText>
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            padding: 20,
          }}
        >
          <Button primary text=">>" onPress={() => this.nextStep(flowStep + 1)} />
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    newGoal: state.goalReducer.newGoal,
  };
}

NewGoalFlow.propTypes = {
  navigation: PropTypes.object.isRequired,
  createGoal: PropTypes.func.isRequired,
};

// Connect everything
export default connect(
  mapStateToProps,
  { createGoal },
)(NewGoalFlow);
