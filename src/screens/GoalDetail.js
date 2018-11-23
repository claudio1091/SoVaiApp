import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import { robotoWeights } from 'react-native-typography';
import styled from 'styled-components/native';
import Moment from 'moment';
import { LocaleConfig, Calendar } from 'react-native-calendars';

import Container from '../components/Container';
import Button from '../components/Button';
import Loader from '../components/Loader';
import InputDate from '../components/InputDate';

import { updateGoal } from '../actions/goalActions';
import Goal from '../model/goalModel';

const GoalTitle = styled.Text`
  ${robotoWeights.lightObject};
  color: #232855;
  font-size: 45;
  text-align: center;
`;

const SubTitle = styled.Text`
  ${robotoWeights.boldObject};
  color: #232855;
  font-size: 20;
  margin-bottom: 12;
`;

const localeCalendar = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dec'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
};

class GoalDetail extends Component {
  constructor(props) {
    super(props);
    Moment.locale('pt-br');

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
  };

  markerGoalDate = date => {
    const { goal } = this.state;
    const dateFormatted = new Date();

    dateFormatted.setDate(date.day);
    dateFormatted.setMonth(date.month - 1);
    dateFormatted.setYear(date.year);

    goal.achievementDay(dateFormatted);
    this.setState({ goal });
  };

  updateGoalDate = date => {
    const { goal } = this.state;
    goal.dtGoal = date;

    this.setState({ goal });
  };

  saveGoal = () => {
    try {
      const { updateGoal } = this.props;
      const { goal } = this.state;

      this.setState({ loading: true }, () => {
        updateGoal(goal, this.onSuccess, this.onError);
      });
    } catch (err) {
      console.warn(err);
      this.setState({ loading: false });
    }
  };

  render() {
    const { goal, loading } = this.state;
    const { daysAchievement } = goal;

    const markedDates = {};
    const dateGoalKey = Moment(goal.dtGoal).format('YYYY-MM-DD');

    daysAchievement.forEach(day => {
      const markerOptions = { selected: true, selectedColor: '#EE6C4D' };
      const dateKey = Moment(day).format('YYYY-MM-DD');

      markedDates[dateKey] = markerOptions;
    });

    markedDates[dateGoalKey] = { selected: true, selectedColor: '#ADB4B9' };

    LocaleConfig.locales['pt-BR'] = localeCalendar;
    LocaleConfig.defaultLocale = 'pt-BR';

    return (
      <Container>
        <Loader loading={loading} />

        <NavigationEvents onWillBlur={() => this.saveGoal()} />

        <ScrollView>
          <GoalTitle>{goal.name.toUpperCase()}</GoalTitle>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              marginVertical: 10,
            }}
          >
            <SubTitle>Até</SubTitle>
            <InputDate
              style={{ flex: 1 }}
              defaultDate={new Date(goal.dtGoal)}
              onChange={value => this.updateGoalDate(value)}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              marginVertical: 10,
            }}
          >
            <SubTitle>Dias Concluídos</SubTitle>
            <Calendar
              style={{
                borderRadius: 20,
                height: 350,
                elevation: 4,
              }}
              theme={{
                arrowColor: '#EE6C4D',
                monthTextColor: '#232855',
                textMonthFontSize: 18,
              }}
              // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
              maxDate={dateGoalKey}
              // Handler which gets executed on day press. Default = undefined
              onDayPress={day => {
                this.markerGoalDate(day);
              }}
              // Handler which gets executed on day long press. Default = undefined
              onDayLongPress={day => {
                this.markerGoalDate(day);
              }}
              // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
              monthFormat="MMMM"
              // Handler which gets executed when visible month changes in calendar. Default = undefined
              onMonthChange={month => {
                console.log('month changed', month);
              }}
              // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
              firstDay={0}
              // Handler which gets executed when press arrow icon left. It receive a callback can go back month
              onPressArrowLeft={substractMonth => substractMonth()}
              // Handler which gets executed when press arrow icon left. It receive a callback can go next month
              onPressArrowRight={addMonth => addMonth()}
              // Collection of dates that have to be marked. Default = {}
              markedDates={markedDates}
            />
          </View>

          <View
            style={{
              marginTop: 25,
              marginBottom: 10,
            }}
          >
            <Button text="concluir" onPress={() => this.saveGoal()} />
            <Button text="excluir" onPress={() => this.saveGoal()} />
          </View>
        </ScrollView>
      </Container>
    );
  }
}

// Connect everything
export default connect(
  null,
  { updateGoal },
)(GoalDetail);
