import React, { Component } from 'react';
import { View, AsyncStorage, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Moment from 'moment';

import Container from '../components/Container';
import Button from '../components/Button';
import FormTextInput from '../components/FormTextInput';
import InputDate from '../components/InputDate';
import Loader from '../components/Loader';

import { createGoal } from '../actions/goalActions';
import Goal from '../model/goalModel';

const NormalText = styled.Text`
  color: #232855;
  font-size: 40;
  font-weight: 300;
`;

const HighlightText = styled(NormalText)`
  color: #ee6c4d;
`;

const placeholdersExamples = [
  'Correr 5km', 
  'Manter uma alimentação saudável', 
  'Ir á academia', 
  'Guardar R$ 2,00',
  'Organizar agenda',
  'Rever material de estudos'
];

class NewGoalFlow extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const goalParam = navigation.getParam('goal', new Goal());

    this.state = {
      goal: goalParam,
      loading: false,
    };
  }

  onSuccess = user => {
    const { navigation } = this.props;

    this.setState({ loading: false }, () => {
      navigation.navigate('ListScrn');
    });
  };

  onError = error => {
    console.log(error);
    this.setState({ loading: false });
    ToastAndroid.show('Houve um problema ao criar uma nova meta.', ToastAndroid.SHORT);
  };

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
      this.setState({ loading: false });
    }
  };

  nextStep = async nextStep => {
    const { goal } = this.state;
    const { navigation } = this.props;

    if (nextStep >= 4) {
      // save the goal
      return this.setState({ loading: true }, () => {
        this.persistGoal();
      });
    }

    return navigation.navigate(`Step${nextStep}`, {
      step: nextStep,
      goal,
    });
  };

  updateGoalName = name => {
    const { goal } = this.state;
    const tempGoal = Object.assign({}, goal);
    tempGoal.name = name.toUpperCase();

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
    const flowStep = navigation.getParam('step', 1);
    const { goal, loading } = this.state;

    const placeholderIndex = Math.floor(Math.random() * placeholdersExamples.length);

    return (
      <Container>
        <Loader loading={loading} />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            padding: 20,
          }}
        >
          {flowStep === 1 && (
            <View>
              <NormalText>EU</NormalText>
              <NormalText style={{ marginLeft: 40 }}>QUERO</NormalText>
              <FormTextInput
                placeholder={placeholdersExamples[placeholderIndex]}
                textValue={goal.name || ''}
                returnKeyType="done"
                onSubmitEditing={() => {
                  this.nextStep(flowStep + 1)
                }}
                onChangeText={value => this.updateGoalName(value)}
              />
            </View>
          )}

          {flowStep === 2 && (
            <View>
              <NormalText>QUERO</NormalText>
              <HighlightText style={{ marginLeft: 35 }}>{goal.name ? goal.name.toUpperCase() : ''}</HighlightText>
              <NormalText style={{ marginLeft: 60 }}>ATÉ</NormalText>
              <InputDate defaultDate={goal.dtGoal} onChange={value => this.updateGoalDate(value)} />
            </View>
          )}

          {flowStep === 3 && (
            <View>
              <NormalText>TE MOTIVAREMOS</NormalText>
              <HighlightText style={{ marginLeft: 35 }}>DIARIAMENTE</HighlightText>
              <NormalText style={{ textAlign: 'right' }}>A ATINGIR SUA</NormalText>
              <NormalText>META DE</NormalText>
              <HighlightText style={{ textAlign: 'center' }}>{goal.name ? goal.name.toUpperCase() : ''}</HighlightText>
              <NormalText style={{ textAlign: 'right' }}>ATÉ</NormalText>
              <HighlightText style={{ textAlign: 'right' }}>
                {goal.dtGoal ? Moment(goal.dtGoal).format('DD/MM/YYYY') : ''}
              </HighlightText>
            </View>
          )}

        </View>

        {flowStep !== 1 ? <Button text="Voltar" onPress={() => this.nextStep(flowStep - 1)} /> : null}

        {flowStep !== 3 ? (
          <Button primary text="Próximo" onPress={() => this.nextStep(flowStep + 1)} />
        ) : (
          <Button primary text="Só Vai!!" onPress={() => this.nextStep(flowStep + 1)} />
        )}
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
