import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import { database } from '../config/firebase';

getUserId = async () => {
  try {
    let user = await AsyncStorage.getItem('user');
    return await JSON.parse(user).uid;
  } catch (err) {
    console.trace({ err });
    return undefined;
  }
};

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

export async function getGoalsLocalStorage(callback) {
  try {
    const value = await AsyncStorage.getItem('goals');

    if (value) {
      // have data
      callback(true, JSON.parse(value));
    } else {
      // don't have goals data
      const uid = await this.getUserId();
      this.getGoalsFirebase(uid, callback);
    }
  } catch (err) {
    callback(false, null, { message: err });
  }
}

/**
 * Get all goals from Firebase
 * @param {int} userId User uid
 * @param {function} callback
 */
export function getGoals(userId, callback) {
  const goalRef = database.ref('goals/' + userId);

  // listening data modifications
  goalRef.on('value', snapshot => {
    // AsyncStorage.multiSet([['goals', JSON.stringify(snapshot)]]);
    callback(true, snapshot);
  });
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
