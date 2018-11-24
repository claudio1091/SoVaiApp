import firebase from 'react-native-firebase';
import { AsyncStorage } from 'react-native';
import { QUOTES_LOCAL_KEY } from '../config/constants';

// Create the user object in realtime database
export function createGoal(goal, callback) {
  try {
    const { userId } = goal;
    const goalRef = firebase.database().ref(`goals/${userId}`);
    const newGoalRef = goalRef.push(goal);
    const goalKey = newGoalRef.key;
    goal.id = goalKey;

    const updates = {};
    updates[`goals/${userId}/${goalKey}`] = goal;

    firebase
      .database()
      .ref()
      .update(updates);

    callback(true, goal, null);
  } catch (error) {
    callback(false, null, { message: error });
  }
}

/**
 * Get all goals from Firebase
 * @param {int} userId User uid
 * @param {function} callback
 */
export function getGoals(userId, callback) {
  const goalRef = firebase.database().ref(`goals/${userId}`);

  // listening data modifications
  goalRef.on('value', snapshot => {
    callback(true, snapshot);
  });
}

export function updateGoal(goal, callback) {
  try {
    const { id, userId } = goal;

    const updates = {};
    updates[`goals/${userId}/${id}`] = goal;

    firebase
      .database()
      .ref()
      .update(updates);

    callback(true, goal, null);
  } catch (error) {
    callback(false, null, { message: error });
  }
}

export async function makeNotifications(goals) {
  await firebase.notifications().cancelAllNotifications();
  if (!goals) return;

  let quotes = await AsyncStorage.getItem(QUOTES_LOCAL_KEY);
  quotes = JSON.parse(quotes);

  goals.forEach(async goal => {
    if (!goal.id) return;

    // if 'tomorrow' is greater than goal due date not make a schedule notification
    if (new Date().setDate(new Date().getDate() + 1) > goal.dtGoal) return;

    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const notification = new firebase.notifications.Notification()
      .setNotificationId(goal.id)
      .setTitle(`Não se esqueça do seu objetivo: ${goal.name}`)
      .setBody(quotes[quoteIndex].quote)
      .setData(goal)
      .android.setChannelId('so-vai-main-channel')
      .android.setSmallIcon('ic_launcher')
      .android.setBigText(quotes[quoteIndex].quote)
      .android.setGroupSummary(true)
      .android.setGroup(goal.id);

    // Schedule the notification for 10 minutes in the future
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(9, 0, 0);

    await firebase.notifications().scheduleNotification(notification, {
      exact: true,
      fireDate: date.getTime(),
      repeatInterval: 'day',
    });
  });
}
