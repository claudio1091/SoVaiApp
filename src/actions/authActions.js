import * as actionTypes from './actionTypes';
import * as authHelper from '../helpers/authHelper';

export function register(data, successCallback, errorCallback) {
  return dispatch => {
    authHelper.register(data, function(success, data, error) {
      if (success) {
        dispatch({ type: actionTypes.LOGGED_IN, data });
        successCallback(data);
      } else if (error) errorCallback(error);
    });
  };
}

export function createUser(user, successCallback, errorCallback) {
  return dispatch => {
    authHelper.createUser(user, function(success, data, error) {
      if (success) {
        dispatch({ type: actionTypes.LOGGED_IN, data: user });
        successCallback();
      } else if (error) errorCallback(error);
    });
  };
}

export function login(data, successCallback, errorCallback) {
  return dispatch => {
    authHelper.login(data, function(success, data, error) {
      if (success) {
        if (data.exists)
          dispatch({ type: actionTypes.LOGGED_IN, data: data.user });
        successCallback(data);
      } else if (error) errorCallback(error);
    });
  };
}

export function resetPassword(data, successCallback, errorCallback) {
  return dispatch => {
    authHelper.resetPassword(data, function(success, data, error) {
      if (success) successCallback();
      else if (error) errorCallback(error);
    });
  };
}

export function signOut(successCallback, errorCallback) {
  return dispatch => {
    authHelper.signOut(function(success, data, error) {
      if (success) {
        dispatch({ type: actionTypes.LOGGED_OUT });
        successCallback();
      } else if (error) errorCallback(error);
    });
  };
}

export function checkLoginStatus(callback) {
  return dispatch => {
    /* auth.onAuthStateChanged(user => {
      let isLoggedIn = user !== null;

      if (isLoggedIn) { */
    authHelper.getUser(user, function(success, { exists, user }, error) {
      if (success) {
        if (exists) dispatch({ type: actionTypes.LOGGED_IN, data: user });
        callback(exists, isLoggedIn);
      } else if (error) {
        //unable to get user
        dispatch({ type: actionTypes.LOGGED_OUT });
        callback(false, false);
      }
    });
    /*} else {
        dispatch({ type: actionTypes.LOGGED_OUT });
        callback(false, isLoggedIn);
      }
    });*/
  };
}

export function signInWithFacebook(
  facebookToken,
  successCallback,
  errorCallback
) {
  return dispatch => {
    authHelper.signInWithFacebook(facebookToken, function(
      success,
      data,
      error
    ) {
      if (success) {
        if (data.exists)
          dispatch({ type: actionTypes.LOGGED_IN, data: data.user });
        successCallback(data);
      } else if (error) errorCallback(error);
    });
  };
}
