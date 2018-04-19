import { adapter } from '../adapter';
import { ASYNC_START, GRAB_ALL_USERS, USER_ONLINE, USER_OFFLINE, SET_CURRENT_USER, SET_CURRENT_CHANNEL, GRAB_ALL_USER_CHANNELS, ADD_MESSAGE_TO_CHANNEL, ADD_CHANNEL_TO_USER, ADD_DM_TO_USER, UPDATE_ACTIVE_CHANNEL, UPDATE_LAST_CHANNEL_READ_MESSAGES, LOGOUT_USER } from '../constants';


// Hits the auth controller #show action, grabs token from localStorage and if loggedIn sends back user id, username, team and display name
export const fetchUser = () => dispatch => {
  debugger;
  dispatch({ type: ASYNC_START });
  adapter.auth.getCurrentUser().then(user => {
    debugger;
    dispatch({ type: SET_CURRENT_USER, user });
  });
};

// Calls the login action which creates the auth session, if authenticated send back the token, user id, user display name, and user team
export const loginUser = (username, password, history) => dispatch => {
  dispatch({ type: ASYNC_START });
  console.log("Is it working?")
  adapter.auth.login({ username, password }).then(user => {
    console.log("This is the user", user)
    localStorage.setItem('token', user.jwt);
    localStorage.setItem('user_id', user.id)
    dispatch({ type: SET_CURRENT_USER, user });
    history.push('/slackhome');
  });
};

// export const signup = user => dispatch => {
//   dispatch({ type: 'ASYNC_START' });
//   adapter.user.signup(user).then(res => {
//     if (res.errors) {
//       dispatch({ type: 'ASYNC_ERROR_USER', data: res.errors });
//     } else {
//       dispatch({ type: 'SIGNEDUP' });
//     }
//   });
// };

// Logout user, removes token from local storage. Return line does not have a purpose at the moment.
export const logoutUser = () => {
  // console.log("CLICKED")
  localStorage.removeItem('token');
  return { type: LOGOUT_USER };
};

// Before this function runs there should be a logic check to see if a user is a member of any channels. If so, it should grab the one with the most recently read message (this will be a custom function on the Channel model that iterates through all the channels and finds the one most recently read)
export const grabActiveChannel = (channel_id) => dispatch => {
  adapter.channels.getByChannel(channel_id).then(channel => {
    debugger
    console.log("Just finished fething the active channel", channel)
    dispatch({ type: SET_CURRENT_CHANNEL, channel})
    localStorage.setItem('activeChannel', channel_id);
  })
}

// The initial API call, which needs to be refactored to only grab the name of the channels, the channel slug (which will be used as a unique identifier and used in the /slackhome/:channelSlug to make another call to the DB to grab that channel's messages) and the length of messages associated with each channel
export const grabUserChannels = (user_id) => dispatch => {
  setTimeout(() => {
    adapter.channels.grabUserChannels(user_id).then(channels => {
    // console.log("Just finished fething", channels)
    dispatch({ type: GRAB_ALL_USER_CHANNELS, channels})
    localStorage.setItem('userChannels', channels);
      })
    }, 1000);
}

// Dispatches a message to the store, will be refactored to only account for length of a User Channel's messages changing
export const addMessage = (message) => dispatch => {
  debugger;
  dispatch({ type: ADD_MESSAGE_TO_CHANNEL, message})
}

// Channel comes in from Web Socket, added to list of channels. Again, needs to be refactored to only add the name and slug of the channel to the store
export const addChannel = (channel) => dispatch => {
  dispatch({ type: ADD_CHANNEL_TO_USER, channel})
}

// DM comes in from Web Socket, added to list of channels. Again, needs to be refactored to only add the name and slug of the channel to the store
export const addDM = (dm) => dispatch => {
  dispatch({ type: ADD_DM_TO_USER, dm})
}

// Iterates through the store to find the channel with the matching ID, then sets the activeChannelID in the store. Should be refactored (or not used at all) to make a new API call and grab the messages from that particular channel. Probably use the slug.
export const updateActiveChannel = (id) => dispatch => {
  debugger;
  dispatch({ type: UPDATE_ACTIVE_CHANNEL, id})
}

// Basically it is a clear notifications app, updates the channel's LAST_SEEN timestamp column in the backend when clicked
export const updateLastChannelReadMessages = (id) => dispatch => {
  dispatch({ type: UPDATE_LAST_CHANNEL_READ_MESSAGES, id})
}

// Grab all the members from that team and populate the create Channel/create DM form. Should be refactored to make an Async call to grab them, not how it currently works which is grabbing all of that data at the beginning. Might be some sort of other action calling a reducer when a new User is created.
export const createUserOptionsForForm = () => dispatch => {
  dispatch({type: GRAB_ALL_USERS})
}

// User subscribes to websocket, green light goes off.
export const userOnline = team => dispatch => {
  dispatch({type: USER_ONLINE, team})
}

// User unsubscribes from websocket, green light goes off.
export const userOffline = team => dispatch => {
  debugger;
  dispatch({type: USER_OFFLINE, team})
}
