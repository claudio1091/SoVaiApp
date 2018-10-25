import Goal from '../model/goalModel';
import * as actionTypes from '../actions/actionTypes'; //Import the actions types constant we defined in our actions

let initialState = {
  isLoading: false,
  goals: [],
  newGoal: {}
};

const goalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GOALS_LOADING: {
      const goals = state.goals;
      if (goals.length === 0) return { ...state, isLoading: true };

      return state;
    }

    case actionTypes.GOALS_AVAILABLE: {
      let { data } = action;
      let goals = [];

      //convert the snapshot (json object) to array
      data.forEach(function(childSnapshot) {
        const item = childSnapshot.val();
        item.key = childSnapshot.key;

        const goal = new Goal(
          item._userId,
          item._name,
          item._dtGoal,
          item._status
        );
        goal.inflate(item);

        goals.push(goal);
      });

      goals.reverse();

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
