import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { robotoWeights } from 'react-native-typography';
import styled from 'styled-components/native';
import Moment from 'moment';
import { Calendar } from 'react-native-calendars';

import Container from '../components/Container';
import Button from '../components/Button';
import Loader from '../components/Loader';

import { updateGoal } from '../actions/goalActions';
import Goal from '../model/goalModel';

const GoalTitle = styled.Text`
  ${robotoWeights.lightObject};
  color: #232855;
  font-size: 45;
  text-align: center;
`;

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

    daysAchievement.forEach(day => {
      const markerOptions = { selected: true, selectedColor: '#EE6C4D' };
      const dateKey = Moment(day).format('YYYY-MM-DD');

      markedDates[dateKey] = markerOptions;
    });

    console.log(markedDates);

    return (
      <Container>
        <Loader loading={loading} />
        <View>
          <GoalTitle>{goal.name.toUpperCase()}</GoalTitle>
        </View>

        <ScrollView>
          <Calendar
            style={{ borderRadius: 10 }}
            // Initially visible month. Default = Date()
            current="2018-11-04"
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate="2018-11-01"
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate="2018-11-30"
            // Handler which gets executed on day press. Default = undefined
            onDayPress={day => {
              this.markerGoalDate(day);
            }}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={day => {
              console.log('selected day', day);
            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat="yyyy MM"
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={month => {
              console.log('month changed', month);
            }}
            // Do not show days of other months in month page. Default = false
            hideExtraDays
            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={substractMonth => substractMonth()}
            // Handler which gets executed when press arrow icon left. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
            // Collection of dates that have to be marked. Default = {}
            markedDates={markedDates}
          />
          <Button primary text="SALVAR" onPress={() => this.saveGoal()} />
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
