import { ActionTypes } from '../actionTypes/ActionTypes';

const globalState = {
  products: [],
};

export const rootReducer = (state = globalState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_PRODUCTS:
      return {
        ...state,
        products: payload,
      };

    default:
  }
  return state;
};
