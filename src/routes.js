import { Animated, Easing } from 'react-native';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import SingIn from './screens/singIn';
import SingUp from './screens/singUp';
import ListGoals from './screens/listGoals';
import NewGoalFlow from './screens/newGoalFlow';

const RootStack = createStackNavigator(
  {
    ListScrn: ListGoals,
    NewGoalFlow
  },
  {
    initialRouteName: 'ListScrn',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#EE6C4D',
        height: 60,
        elevation: 2
      },
      headerTintColor: '#FFF',
      headerTitleContainerStyle: {
        padding: 8
      },
      headerTitleStyle: {
        fontWeight: '300'
      }
    }
  }
);

export const AppStack = createSwitchNavigator(
  {
    SingIn,
    SingUp,
    RootStack
  },
  {
    initialRouteName: 'SingIn',
    transitionConfig
  }
);

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;

      const thisSceneIndex = scene.index;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0]
      });

      return { transform: [{ translateX }] };
    }
  };
};
