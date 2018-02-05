const API_ROOT = `http://localhost:3000/api/v1`;

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
  debugger
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

const createMessage = message => {
  return fetch(`${API_ROOT}/messages`, {
    method: 'POST',
    headers,
    body: JSON.stringify(message)
  }).then(res => res.json())
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
    grabUserChannels
  },
  messages: {
    createMessage
  }
};
