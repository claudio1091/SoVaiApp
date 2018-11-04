import React from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import { robotoWeights } from 'react-native-typography';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Moment from 'moment';

const BackgroundContainer = styled.View`
  background-color: #fff;
  border-radius: 10;
  padding-top: 15;
  padding-bottom: 15;
  padding-right: 15;
  padding-left: 15;
  margin-top: 5;
  margin-bottom: 5;
  margin-left: 3;
  margin-right: 3;
  elevation: 3;
`;

const GoalTitle = styled.Text`
  ${robotoWeights.lightObject};
  color: #232855;
  font-size: 25;
  margin-bottom: 10;
`;

const GoalText = styled.Text`
  ${robotoWeights.lightObject};
  color: rgba(35, 40, 85, 0.6);
  font-size: 18;
`;

const ListItemGoal = ({ item, onPress }) => {
  Moment.locale('pt-br');

  return (
    <TouchableNativeFeedback onPress={() => (onPress ? onPress(item) : null)}>
      <BackgroundContainer>
        <GoalTitle>{item.name.toUpperCase()}</GoalTitle>

        <View>
          <GoalText>
            {item.repeatIn === 'days' ? 'Diariamente' : '--'} - até {Moment(item.dtGoal).format('DD/MM')}
          </GoalText>

          {item.daysAchievement && item.daysAchievement.length ? (
            <GoalText>{item.daysAchievement.length} dias concluídos</GoalText>
          ) : (
            <GoalText>Nenhum dia concluído ... ainda</GoalText>
          )}
        </View>
      </BackgroundContainer>
    </TouchableNativeFeedback>
  );
};

ListItemGoal.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ListItemGoal;
