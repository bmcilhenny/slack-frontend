// API constants
export const API_ROOT = 'http://localhost:3000/api/v1/teams/5'
export const HEADERS = {
  'Content-Type': 'application/json',
  'Accepts': 'application/json'
};


//Action constants
export const ASYNC_START = 'ASYNC_START';
export const GRAB_ALL_USERS = 'GRAB_ALL_USERS';
export const USER_ONLINE = 'USER_ONLINE';
export const USER_OFFLINE = 'USER_OFFLINE';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_CURRENT_CHANNEL = 'SET_CURRENT_CHANNEL';
export const GRAB_ALL_USER_CHANNELS = 'GRAB_ALL_USER_CHANNELS';
export const ADD_MESSAGE_TO_CHANNEL = 'ADD_MESSAGE_TO_CHANNEL';
export const ADD_CHANNEL_TO_USER = 'ADD_CHANNEL_TO_USER';
export const ADD_DM_TO_USER = 'ADD_DM_TO_USER';
export const UPDATE_ACTIVE_CHANNEL = 'UPDATE_ACTIVE_CHANNEL';
export const UPDATE_LAST_CHANNEL_READ_MESSAGES = 'UPDATE_LAST_CHANNEL_READ_MESSAGES';
export const LOGOUT_USER = 'LOGOUT_USER';