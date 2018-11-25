import Goal from '../model/goalModel';
import * as actionTypes from '../actions/actionTypes'; // Import the actions types constant we defined in our actions
import * as goalHelper from '../helpers/goalHelper';

const initialState = {
  isLoading: false,
  goals: [],
  newGoal: {},
};

const goalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GOALS_LOADING: {
      const goals = state.goals;
      if (goals.length === 0) return { ...state, isLoading: true };

      return state;
    }

    case actionTypes.GOALS_AVAILABLE: {
      const { data } = action;
      const goals = [];

      // convert the snapshot (json object) to array
      data.forEach(childSnapshot => {
        const item = childSnapshot.val();
        item.key = childSnapshot.key;

        const goal = new Goal(item.userId, item.name, item.dtGoal, item.status);
        goal.inflate(item);

        if (goal.status === 'open') goals.push(goal);
      });

      goals.reverse();

      // make notifications
      goalHelper.makeNotifications(goals);

      return { ...state, goals, isLoading: false };
    }

    case actionTypes.LOGGED_OUT: {
      return { ...state, goals: [] };
    }

    default:
      return state;
  }
};

export default goalReducer;
