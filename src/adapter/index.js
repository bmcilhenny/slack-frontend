import  { API_ROOT, API_REFACTORED_ROOT, HEADERS, HEADERS_WITH_TOKEN } from '../constants';

const getWithToken = url => {
  return fetch(url, {
    headers: HEADERS_WITH_TOKEN
  })
  .then(res => res.json())
  .catch(() => window.alert('ERROR'));
};

const login = data => {
  // console.log("Inside the adapter", data)
  return fetch(`${API_ROOT}/login`, {
    method: 'POST',
    headers: HEADERS_WITH_TOKEN,
    body: JSON.stringify(data)
  })
  .then(res => res.json());
};

const signup = data => {
  return fetch(`${API_ROOT}/users`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(data)
  }).then(res => res.json())
  .catch(() => window.alert('ERROR'))
};

const getCurrentUser = () => {
  return getWithToken(`${API_ROOT}/current_user`);
};

const getUserData = () => {
  return getWithToken(`${API_ROOT}/user_data`);
};

const getTeammates = (team_id) => {
  return getWithToken(`${API_REFACTORED_ROOT}/teams/${team_id}/users`)
}

const getUsers = (teamID) => {
  return fetch(`${API_ROOT}/teams/${teamID}/users`, { headers: HEADERS }).then(res =>
    res.json()
  );
};

const grabChannels = (teamID, userID) => {
  return getWithToken(`${API_REFACTORED_ROOT}/teams/${teamID}/users/${userID}`);
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
    headers: HEADERS,
    body: JSON.stringify(channel)
  })
}

const createMessage = message => {
  return fetch(`${API_ROOT}/messages`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(message)
  })
}

const labelTheDM = (channelUsers, team, currentUserID) => {
  let filteredUser = channelUsers.filter(user => user.id !== currentUserID)
  debugger
  let filteredTeam = team.filter(user => user.id === filteredUser[0].id);
  debugger;
  if (filteredTeam && filteredTeam[0].online) {
    return true
  } else {
    return false
  }
}

const updateLastSeen = (channel) => {
  return fetch(`${API_ROOT}/update_last_seen`, {
    method: 'POST',
    headers: HEADERS,
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
    grabChannels,
    grabUserChannels,
    createChannel,
    updateLastSeen
  },
  messages: {
    createMessage
  },
  websocket: {
    // handleSocketResponse
  },
  team: {
    getTeammates
  }
};
