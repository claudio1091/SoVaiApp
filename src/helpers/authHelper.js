import firebase from 'react-native-firebase';

//Register the user using email and password
export function register(data, callback) {
  const { email, password, username } = data;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(resp => createUser({ username, uid: resp.user.uid }, callback))
    .catch(error => callback(false, null, error));
}

//Create the user object in realtime database
export function createUser(user, callback) {
  const userRef = firebase
    .database()
    .ref()
    .child('users');

  userRef
    .child(user.uid)
    .update({ ...user })
    .then(() => callback(true, user, null))
    .catch(error => callback(false, null, { message: error }));
}

//Sign the user in with their email and password
export function login(data, callback) {
  const { email, password } = data;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(resp => getUser(resp.user, callback))
    .catch(error => callback(false, null, error));
}

//Get the user object from the realtime firebase.database()
export function getUser(user, callback) {
  console.log('getUser -> ', user);
  firebase
    .database()
    .ref('users')
    .child(user.uid)
    .once('value')
    .then(function(snapshot) {
      const exists = snapshot.val() !== null;

      //if the user exist in the DB, replace the user variable with the returned snapshot
      if (exists) user = snapshot.val();

      const data = { exists, user };
      console.log({ data });
      callback(true, data, null);
    })
    .catch(error => callback(false, null, error));
}

//Send Password Reset Email
export function resetPassword(data, callback) {
  const { email } = data;
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(user => callback(true, null, null))
    .catch(error => callback(false, null, error));
}

// Sing out user
export function signOut(callback) {
  firebase
    .auth()
    .signOut()
    .then(() => {
      if (callback) callback(true, null, null);
    })
    .catch(error => {
      if (callback) callback(false, null, error);
    });
}
