import { combineReducers } from 'redux';

import goalReducer from './goalReducer';
import authReducer from './authReducer';

// Combine all the reducers
const rootReducer = combineReducers({
  authReducer,
  goalReducer
});

export default rootReducer;
