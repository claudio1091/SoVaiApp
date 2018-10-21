import firebase from 'react-native-firebase';
import { database } from '../config/firebase';

//Create the user object in realtime database
export function createGoal(goal, callback) {
  const { userId } = goal;
  const goalRef = firebase.database().ref('goals/' + userId);
  const newGoalRef = goalRef.push(goal);
  const goalKey = newGoalRef.key;

  goal.id = goalKey;

  let updates = {};
  updates[`goals/${userId}/${goalKey}`] = goal;

  firebase
    .database()
    .ref()
    .update(updates)
    .then(() => callback(true, goal, null))
    .catch(error => callback(false, null, { message: error }));
}

export function getGoals(userId, callback) {
  const goalRef = database.ref('goals/' + userId);

  // listening data modifications
  goalRef.on('value', snapshot => callback(true, snapshot));
}

export function updateGoal(goal, callback) {
  const { id, userId } = goal;

  let updates = {};
  updates[`goals/${userId}/${id}`] = goal;

  firebase
    .database()
    .ref()
    .update(updates)
    .then(() => callback(true, goal, null))
    .catch(error => callback(false, null, error));
}
