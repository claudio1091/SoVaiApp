import firebase from 'react-native-firebase';
import * as actionTypes from './actionTypes';
import * as goalHelper from '../helpers/goalHelper';

export function createGoal(goal, successCallback, errorCallback) {
  return dispatch => {
    console.log('Going offline');
    firebase.database().goOffline();

    setTimeout(() => {
      console.log('Going online');
      firebase.database().goOnline();
    }, 20000);

    goalHelper.createGoal(goal, (success, data, error) => {
      if (success) successCallback(data);
      else if (error) errorCallback(error);
    });
  };
}

export function getGoals(userId, errorCB) {
  return dispatch => {
    dispatch({ type: actionTypes.GOALS_LOADING });
    goalHelper.getGoals(userId, (success, data, error) => {
      if (success) dispatch({ type: actionTypes.GOALS_AVAILABLE, data });
      else if (error) errorCB(error);
    });
  };
}

export function updateGoal(goal, successCallback, errorCallback) {
  return dispatch => {
    goalHelper.updateGoal(goal, (success, data, error) => {
      if (success) successCallback(data);
      else if (error) errorCallback(error);
    });
  };
}
