import { ASYNC_START, ASYNC_FINISH } from '../constants';

const initialState = { loading: false };

export const asyncReducer = (state = initialState, action) => {
  switch (action.type) {
    case ASYNC_START:
      return { loading: true};
    case ASYNC_FINISH:
      return initialState;
    default:
      return state;
  }
};
