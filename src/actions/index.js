import { adapter } from '../adapter';

export const fetchUser = () => dispatch => {
  dispatch({ type: 'ASYNC_START' });
  adapter.auth.getCurrentUser().then(user => {
    dispatch({ type: 'SET_CURRENT_USER', user });
  });
};

export const loginUser = (username, password, history) => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  adapter.auth.login({ username, password }).then(user => {
    localStorage.setItem('token', user.jwt);
    localStorage.setItem('user_id', user.id)
    dispatch({ type: 'SET_CURRENT_USER', user });
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

export const logoutUser = () => {
  console.log("CLICKED")
  localStorage.removeItem('token');
  return { type: 'LOGOUT_USER' };
};


export const grabActiveChannel = (channel_id) => dispatch => {
  debugger
  adapter.channels.getByChannel(channel_id).then(channel => {
    debugger
    console.log("Just finished fething the active channel", channel)
    dispatch({ type: 'SET_CURRENT_CHANNEL', channel})
    localStorage.setItem('activeChannel', channel_id);
  })
}

export const grabUserChannels = (user_id) => dispatch => {
  setTimeout(() => {
    adapter.channels.grabUserChannels(user_id).then(channels => {
    // console.log("Just finished fething", channels)
    dispatch({ type: 'GRAB_ALL_USER_CHANNELS', channels})
    localStorage.setItem('userChannels', channels);
      })
    }, 1000);
}


export const addMessage = (message) => dispatch => {
  debugger;
  dispatch({ type: 'ADD_MESSAGE_TO_CHANNEL', message})
}

export const addChannel = (channel) => dispatch => {
  dispatch({ type: 'ADD_CHANNEL_TO_USER', channel})
}

export const addDM = (dm) => dispatch => {
  dispatch({ type: 'ADD_DM_TO_USER', dm})
}

export const updateActiveChannel = (id) => dispatch => {
  debugger;
  dispatch({ type: 'UPDATE_ACTIVE_CHANNEL', id})
}

export const updateLastChannelReadMessages = (id) => dispatch => {
  dispatch({ type: 'UPDATE_LAST_CHANNEL_READ_MESSAGES', id})
}

export const createUserOptionsForForm = () => dispatch => {
  dispatch({type: 'GRAB_ALL_USERS'})
}

export const userOnline = team => dispatch => {
  dispatch({type: 'USER_ONLINE', team})
}

export const userOffline = team => dispatch => {
  debugger;
  dispatch({type: 'USER_OFFLINE', team})
}
