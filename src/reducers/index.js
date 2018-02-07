import { combineReducers } from 'redux';

const authReducer = (state = { currentUser: {}}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
    const { id, username, display_name } = action.user;
      return { ...state, currentUser: { id, username, display_name } };
    case 'LOGOUT_USER':
      return { ...state, currentUser: {} };
    default:
      return state;
  }
};


const channelsReducer = (state = {activeChannelID: '', channels: [], loading: false}, action) => {
  switch (action.type) {
    case 'ASYNC_START':
      return { ...state, loading: true }
    case 'SET_CURRENT_CHANNEL':
      return {...state, activeChannelID: action.channel.id}
    case 'UPDATE_ACTIVE_CHANNEL':
      return {...state, activeChannelID: parseInt(action.id)}
    case 'GRAB_ALL_USER_CHANNELS':
      return {...state, channels: [...action.channels], loading: false}
    case 'ADD_MESSAGE_TO_CHANNEL':
      let copiedChannels = [...state.channels]
      let foundChannel = copiedChannels.find(channel => channel.id === action.message.message.channel_id);
      let index = state.channels.indexOf(foundChannel)
      let updatedMessages = [...foundChannel.messages, action.message.message]
      let updatedChannel = {...foundChannel, messages: updatedMessages};
      if (foundChannel) {
        return {...state, channels: [...state.channels.slice(0, index), updatedChannel , ...state.channels.slice(index + 1.0
        )]}
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
  channel: channelsReducer
});

export default rootReducer;
