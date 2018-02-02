import { combineReducers } from 'redux';

const initialState = { currentUser: {} };
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
    const { id, username } = action.user;
    return { ...state, currentUser: { id, username } };
    case 'LOGOUT_USER':
    return { ...state, currentUser: {} };
    default:
    return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer
});

export default rootReducer;
// const rootReducer = combineReducers({
//   channels: channelsReducer,
//   messages: messagesReducer,
//   // users: usersReducer
// });
//
// export const store = createStore(rootReducer);
//
// function channelsReducer(state = [], action) {
//   switch (action.type) {
//
//      case "ADD_CHANNEL":
//       return state.concat(action.channel);
//
//     case "REMOVE_CHANNEL":
//       const idx = state.indexOf(action.id);
//       return [ ...state.slice(0, idx), ...state.slice(idx + 1) ];
//
//     default:
//       return state;
//   }
// }
//
// function messagesReducer(state = [], action) {
//   switch (action.type) {
//
//     case "ADD_MESSAGE":
//       return state.concat(action.message);
//
//     case "REMOVE_MESSAGE":
//       const idx = state.indexOf(action.id);
//       return [ ...state.slice(0, idx), ...state.slice(idx + 1) ];
//
//     default:
//       return state;
//   }
// }
