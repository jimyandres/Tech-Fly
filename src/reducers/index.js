import { combineReducers } from 'redux';
import AuthenticationReducer from './authentication';
import ErrorReducer from './error';
import ListReducer from './list';
import ProgressReducer from './progress';

const reducers = {
  error: ErrorReducer,
  list: ListReducer,
  progress: ProgressReducer,
  authentication: AuthenticationReducer,
};

export default combineReducers(reducers);
