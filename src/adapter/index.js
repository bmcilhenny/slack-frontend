import  { API_ROOT, HEADERS, HEADERS_WITH_TOKEN } from '../constants';
import Sound from 'react-sound';

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
    headers: HEADERS,
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
  // debugger;
  return getWithToken(`${API_ROOT}/current_user`);
};

const getUsers = () => {
  return fetch(`${API_ROOT}/users`, { headers: HEADERS }).then(res =>
    res.json()
  );
};

const getByChannel = channel_id => {
  let user_id = localStorage.getItem('user_id')
  debugger;
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

const arrayContainsObj = (obj, array) => {
  var i;
  for (i = 0; i < array.length; i++) {
    if (array[i].id === obj.id) {
      return true;
    }
  }
  return false;
}

const isUserOnline = (userID, array) => {
  debugger;
  let userObj = array.find(user => user.id === userID);
  if (userObj.online === true) {
    return true
  }
  else {
    return false;
  }
}

const nameTheDM = (channelUsers, currentUserID) => {
  let filteredUsers = channelUsers.filter(user => user.id !== currentUserID);
  return filteredUsers.map( user => user.display_name).join(', ')
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
  debugger
  return fetch(`${API_ROOT}/update_last_seen`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(channel)
  })
}

const populateModalsWithTeammateOptions = (team) => {
  let reconfiguredTeam = team.map(user => ({text: user.display_name, value: user.id, image: ({ avatar: true, src: user.image_url})}))
  return reconfiguredTeam
}

const formatDateTime = (dateStr) => {
  let date = new Date(dateStr);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
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
    nameTheDM,
    isUserOnline,
    labelTheDM,
    populateModalsWithTeammateOptions,
    formatDateTime
  },
  websocket: {
    // handleSocketResponse
  }
};
