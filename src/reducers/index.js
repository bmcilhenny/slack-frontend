import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { channelsReducer } from './channelsReducer';
import { asyncReducer } from './asyncReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  channel: channelsReducer,
  async: asyncReducer
});
