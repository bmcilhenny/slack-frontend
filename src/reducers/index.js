import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { channelsReducer } from './channelsReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  channel: channelsReducer
});