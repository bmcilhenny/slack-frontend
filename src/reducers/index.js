import { combineReducers } from 'redux';

const authReducer = (state = { currentUser: {}}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
    const { id, username } = action.user;
      return { ...state, currentUser: { id, username } };
    case 'LOGOUT_USER':
      return { ...state, currentUser: {} };
    default:
      return state;
  }
};


const channelsReducer = (state = {activeChannel: {}, channels: [], loading: false}, action) => {
  switch (action.type) {
    case 'ASYNC_START':
      return { ...state, loading: true }
    case 'SET_CURRENT_CHANNEL':
    // const { id, name, details, messages} = action.channel
      return {...state, activeChannel: {...action.channel}}
    case 'GRAB_ALL_USER_CHANNELS':
      return {...state, channels: [...action.channels], loading: false}
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
  channel: channelsReducer
});

export default rootReducer;
