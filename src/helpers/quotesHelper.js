import firebase from 'react-native-firebase';

export default function getQuotes(callback) {
  const goalRef = firebase.database().ref('quotes');

  // listening data modifications
  goalRef.on('value', snapshot => {
    callback(true, snapshot);
  });
}
