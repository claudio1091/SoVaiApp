import React from 'react';
import { View, Text } from 'react-native';
import { robotoWeights } from 'react-native-typography';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Moment from 'moment';

const Background = styled.ImageBackground`
  border-radius: 10;
  flex-direction: column;
  height: 190;
  justify-content: space-between;
  margin: 10;
  padding: 25;
  flex: 1;
`;

const BackgroundOverlay = styled.View`
  background-color: 'rgba(170,255,199,.6)';
  border-color: '#FFF';
  border-radius: 10;
  border-width: 1;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const GoalTitle = styled.Text`
  ${robotoWeights.lightObject};
  color: '#232855';
  font-size: 30;
  font-weight: 300;
  elevation: 2;
`;

const ListItemGoal = ({ item }) => {
  Moment.locale('pt-br');

  return (
    <Background
      source={{
        uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-4.png',
      }}
      blurRadius={5}
      imageStyle={{ borderRadius: 10 }}
    >
      <BackgroundOverlay />
      <GoalTitle>{item.name}</GoalTitle>

      <View>
        <Text
          style={[
            robotoWeights.light,
            {
              color: '#232855',
              fontSize: 20,
              fontWeight: '300',
              elevation: 2,
            },
          ]}
        >
          {item.repeatIn === 'days' ? 'Diariamente' : '--'} - até {Moment(item.dtGoal).format('DD/MM')}
        </Text>
        {item.daysAchievement && item.daysAchievement.length ? (
          <Text>{item.daysAchievement.length} dias concluídos</Text>
        ) : null}
      </View>
    </Background>
  );
};

ListItemGoal.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ListItemGoal;
