import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { channelsReducer } from './channelsReducer';
import { asyncReducer } from './asyncReducer';
import { teammatesReducer } from './teammatesReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  channels: channelsReducer,
  async: asyncReducer,
  teammates: teammatesReducer
});
