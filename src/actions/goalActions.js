import * as actionTypes from './actionTypes';
import * as goalHelper from '../helpers/goalHelper';

export function createGoal(goal, successCallback, errorCallback) {
  return dispatch => {
    goalHelper.createGoal(goal, function(success, data, error) {
      if (success) successCallback(data);
      else if (error) errorCallback(error);
    });
  };
}

export function getGoals(userId, errorCB) {
  return dispatch => {
    dispatch({ type: actionTypes.GOALS_LOADING });
    goalHelper.getGoals(userId, function(success, data, error) {
      if (success) dispatch({ type: actionTypes.GOALS_AVAILABLE, data });
      else if (error) errorCB(error);
    });
  };
}

export function updateGoal(goal, successCallback, errorCallback) {
  return dispatch => {
    goalHelper.updateGoal(goal, function(success, data, error) {
      if (success) successCallback(data);
      else if (error) errorCallback(error);
    });
  };
}
