import { SET_TEAMMATES } from '../constants';

export const teammatesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_TEAMMATES:
      return [...state, action.teammates];
    default:
      return state;
  }
};
