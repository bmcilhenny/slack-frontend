const API_ROOT = `http://localhost:3000/api/v1/teams/4`;

const headers = {
  'Content-Type': 'application/json',
  Accepts: 'application/json'
};

const getUsers = () => {
  return fetch(`${API_ROOT}/users`, { headers: headers }).then(res =>
    res.json()
  );
};

const getWithToken = url => {
  const token = localStorage.getItem('token');
  return fetch(url, {
    headers: { Authorization: token }
  }).then(res => res.json());
};

const getCurrentUser = () => {
  return getWithToken(`${API_ROOT}/current_user`);
};

const login = data => {
  // console.log(data)
  return fetch(`${API_ROOT}/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }).then(res => res.json());
};

const signup = data => {

  return fetch(`${API_ROOT}/auth`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }).then(res => res.json());
};


const getByChannel = channel_id => {
  let user_id = localStorage.getItem('user_id')
  return fetch(`${API_ROOT}/users/${user_id}`).then(res => res.json()).then(user => user.channels.find(channel => channel.id === channel_id))
}

const grabUserChannels = user_id => {
  console.log("Inside the grabUserChannels function", user_id)
  return fetch(`${API_ROOT}/users/${user_id}`).then(res => res.json()).then(user => user.channels)
}

const createChannel = channel => {
  console.log(channel)
  debugger;
  return fetch(`${API_ROOT}/channels`, {
    method: 'POST',
    headers,
    body: JSON.stringify(channel)
  })
}

const createMessage = message => {
  return fetch(`${API_ROOT}/messages`, {
    method: 'POST',
    headers,
    body: JSON.stringify(message)
  })
}

const arrayContainsObj = (obj, array) => {
  var i;
  for (i = 0; i < array.length; i++) {
    if (array[i].id === obj.id) {
      return true;
    }
  }
  return false;
}

const nameTheDM = (channelUsers, currentUserID) => {
  let filteredUsers = channelUsers.filter(user => user.id !== currentUserID);
  return filteredUsers.map( user => user.display_name).join(', ')
}

const updateLastSeen = (channel) => {
  return fetch(`${API_ROOT}/update_last_seen`, {
    method: 'POST',
    headers,
    body: JSON.stringify(channel)
  })
}

export const adapter = {
  auth: {
    login,
    signup,
    getCurrentUser
  },
  users: {
    getUsers
  },
  channels: {
    getByChannel,
    grabUserChannels,
    createChannel,
    updateLastSeen
  },
  messages: {
    createMessage
  },
  helpers: {
    arrayContainsObj,
    nameTheDM
  }
};
