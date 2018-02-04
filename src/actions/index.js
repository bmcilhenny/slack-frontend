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

export const logoutUser = () => {
  localStorage.removeItem('token');
  return { type: 'LOGOUT_USER' };
};


export const grabActiveChannel = (channel_id) => dispatch => {
  adapter.channels.getByChannel(channel_id).then(channel => {
    console.log("Just finished fething")
    dispatch({ type: 'SET_CURRENT_CHANNEL', channel})
    localStorage.setItem('activeChannel', channel_id);
  })
}

export const grabUserChannels = (user_id) => dispatch => {
  setTimeout(() => {
    adapter.channels.grabUserChannels(user_id).then(channels => {
    console.log("Just finished fething", channels)
    dispatch({ type: 'GRAB_ALL_USER_CHANNELS', channels})
    localStorage.setItem('userChannels', channels);
      })
    }, 1000);

  // adapter.channels.grabUserChannels(user_id).then(channels => {
  //   console.log("Just finished fething", channels)
  //   dispatch({ type: 'GRAB_ALL_USER_CHANNELS', channels})
  //   localStorage.setItem('userChannels', channels);
}
