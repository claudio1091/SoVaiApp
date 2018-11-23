import firebase from 'react-native-firebase';
import Goal from '../model/goalModel';
import * as actionTypes from '../actions/actionTypes'; // Import the actions types constant we defined in our actions

const initialState = {
  isLoading: false,
  goals: [],
  newGoal: {},
};

const goalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GOALS_LOADING: {
      const goals = state.goals;
      if (goals.length === 0) return { ...state, isLoading: true };

      return state;
    }

    case actionTypes.GOALS_AVAILABLE: {
      const { data } = action;
      const goals = [];

      // convert the snapshot (json object) to array
      data.forEach(childSnapshot => {
        const item = childSnapshot.val();
        item.key = childSnapshot.key;

        const goal = new Goal(item._userId, item._name, item._dtGoal, item._status);
        goal.inflate(item);

        if (goal.id) {
          // make goal notification
          const notification = new firebase.notifications.Notification()
            .setNotificationId(goal.id)
            .setTitle('Msg motivadora aqui')
            .setBody(`Não esqueça do seu objetivo: ${goal.name}`)
            .android.setChannelId('so-vai-main-channel')
            .android.setSmallIcon('ic_launcher')
            .android.setGroupSummary(true)
            .android.setGroup(goal.id);

          // Schedule the notification for 10 minutes in the future
          const date = new Date();
          date.setMinutes(date.getMinutes() + 2);

          console.log({ notification, date });

          firebase.notifications().scheduleNotification(notification, {
            exact: true,
            fireDate: date.getTime(),
            repeatInterval: 'day',
          });
        }

        goals.push(goal);
      });

      goals.reverse();

      return { ...state, goals, isLoading: false };
    }

    case actionTypes.LOGGED_OUT: {
      return { ...state, goals: [] };
    }

    default:
      return state;
  }
};

export default goalReducer;
