import { Animated, Easing } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { fromLeft, zoomIn } from 'react-navigation-transitions';

import AppLoading from './screens/AppLoading';
import ListGoals from './screens/ListGoals';
import GoalDetail from './screens/GoalDetail';
import NewGoalFlow from './screens/NewGoalFlow';
import SingIn from './screens/SingIn';
import SingUp from './screens/SingUp';

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;

      const thisSceneIndex = scene.index;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      });

      return { transform: [{ translateX }] };
    },
  };
};

const RootStack = createStackNavigator(
  {
    ListScrn: ListGoals,
    NewGoalFlow,
    GoalDetail,
  },
  {
    initialRouteName: 'ListScrn',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#EE6C4D',
        height: 60,
        elevation: 2,
      },
      headerTintColor: '#FFF',
      headerTitleContainerStyle: {
        padding: 8,
      },
      headerTitleStyle: {
        fontWeight: '300',
      },
    },
    transitionConfig: () => zoomIn(600),
  },
);

const AppStack = createStackNavigator(
  {
    AppLoading,
    SingIn,
    SingUp,
    RootStack,
  },
  {
    initialRouteName: 'AppLoading',
    transitionConfig: () => fromLeft(600),
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

export default AppStack;
