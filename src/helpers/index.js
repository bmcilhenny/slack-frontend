const formatTeammates = (teammates) => {
    return teammates.map(teammate => ({text: teammate.display_name, value: teammate.id, image: ({ avatar: true, src: teammate.image_url})}))
}

const nameTheDM = (channelUsers, currentUserID) => {
    let filteredUsers = channelUsers.filter(user => user.id !== currentUserID);
    return filteredUsers.map( user => user.display_name).join(', ')
}

const isUserOnline = (userID, array) => {
    let userObj = array.find(user => user.id === userID);
    return userObj.online ? true : false
}

const formatDateTime = (dateStr) => {
    let date = new Date(dateStr);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}

const arrayContainsObj = (obj, array) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === obj.id) {
        return true;
      }
    }
    return false;
  }

export const helper = {
    userStatus: {
        isUserOnline
    },
    modal: {
        formatTeammates
    },
    channel: {
        nameTheDM
    },
    time: {
        formatDateTime
    },
    general: {
        arrayContainsObj
    }

}