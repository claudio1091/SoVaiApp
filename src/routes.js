import { Animated, Easing } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { fromLeft, zoomIn, fromTop } from 'react-navigation-transitions';

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

function fromRight(duration = 500) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({ layout, position, scene }) => {
      const { index } = scene;
      const { initWidth } = layout;

      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [initWidth, 0, 0],
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

      return { opacity, transform: [{ translateX }] };
    },
  };
}

const AddGoalStack = createStackNavigator(
  {
    Step1: NewGoalFlow,
    Step2: NewGoalFlow,
    Step3: NewGoalFlow,
  },
  {
    initialRouteName: 'Step1',
    transitionConfig: () => fromRight(),
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

const RootStack = createStackNavigator(
  {
    ListScrn: ListGoals,
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
    transitionConfig: () => fromLeft(600),
  },
);

const AppStack = createStackNavigator(
  {
    AppLoading,
    SingIn,
    SingUp,
    RootStack,
    AddGoalStack,
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
