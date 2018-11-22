import firebase from 'react-native-firebase';

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
  } catch(error) {
    callback(false, null, { message: error });
  }
}
