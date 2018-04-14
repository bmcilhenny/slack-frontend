import { ASYNC_START, GRAB_ALL_USERS, USER_ONLINE, USER_OFFLINE, SET_CURRENT_USER, SET_CURRENT_CHANNEL, GRAB_ALL_USER_CHANNELS, ADD_MESSAGE_TO_CHANNEL, ADD_CHANNEL_TO_USER, ADD_DM_TO_USER, UPDATE_ACTIVE_CHANNEL, UPDATE_LAST_CHANNEL_READ_MESSAGES, LOGOUT_USER } from '../constants';

export const channelsReducer = (state = {activeChannelID: '', channels: [], loading: false, team: []}, action) => {
  switch (action.type) {
    case ASYNC_START:
      return { ...state, loading: true }
    case SET_CURRENT_CHANNEL:
      console.log("Inside the current channel reducer")
      debugger;
      return {...state, activeChannelID: action.channel.id}
    case UPDATE_ACTIVE_CHANNEL:
      // debugger;
      return {...state, activeChannelID: parseInt(action.id)}
    case UPDATE_LAST_CHANNEL_READ_MESSAGES:
      // debugger;
      let copiedChannels2 = [...state.channels]
      let foundChannel2 = copiedChannels2.find(channel => channel.id === action.id);
      if (foundChannel2) {
        let index2 = state.channels.indexOf(foundChannel2)
        let copiedUnreadMessages2 = [...foundChannel2.unreadMessages];
        let copiedReadMessages2 = [...foundChannel2.readMessages]
        // debugger
        let newRedMessages2 = [...copiedReadMessages2, ...copiedUnreadMessages2]
        let updatedChannel2 = {...foundChannel2, readMessages: newRedMessages2};
        updatedChannel2 = {...updatedChannel2, unreadMessages: []}
        // debugger;
        return {...state, channels: [...state.channels.slice(0, index2), updatedChannel2 , ...state.channels.slice(index2 + 1.0
        )]}
      } else {
        return state;
      }
    case GRAB_ALL_USER_CHANNELS:
      return {...state, channels: [...action.channels], loading: false}
    case ADD_MESSAGE_TO_CHANNEL:
      let copiedChannels = [...state.channels]
      let foundChannel = copiedChannels.find(channel => channel.id === action.message.message.channel_id);
      // debugger;
      if (foundChannel) {
        let index = state.channels.indexOf(foundChannel)
        let updatedMessages = [...foundChannel.unreadMessages, action.message]
        let updatedChannel = {...foundChannel, unreadMessages: updatedMessages};
        return {...state, channels: [...state.channels.slice(0, index), updatedChannel , ...state.channels.slice(index + 1.0
        )]}
      } else {
        return {...state, channels: [...state.channels]}
      }
    case ADD_CHANNEL_TO_USER:
      // debugger;
      let copiedChannel = [...state.channels];
      return {...state, channels: [...copiedChannel, action.channel]}
    case USER_ONLINE:
      // debugger;
      return {...state, team: action.team.team.users}
      // debugger;
    case USER_OFFLINE:
      // debugger;
      return {...state, team: action.team.team.users}
    default:
      return state;
  }
}