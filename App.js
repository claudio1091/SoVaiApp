import React, { Component } from 'react';
import { View, YellowBox, StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import store from './src/store';
import AppStack from './src/routes';

class App extends Component {
  constructor(props) {
    super(props);

    YellowBox.ignoreWarnings(['Require cycle', 'Setting a timer']);
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" backgroundColor="#F5F8FB" />
          <AppStack />
        </View>
      </Provider>
    );
  }
}

export default App;
