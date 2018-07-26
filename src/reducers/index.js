import { combineReducers } from 'redux';
import ErrorReducer from './error';
import ListReducer from './list';
import ProgressReducer from './progress';

const reducers = {
  error: ErrorReducer,
  list: ListReducer,
  progress: ProgressReducer,
};

export default combineReducers(reducers);
