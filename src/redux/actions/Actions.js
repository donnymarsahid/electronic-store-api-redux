import { ActionTypes } from '../actionTypes/ActionTypes';

export const getProducts = (data) => {
  return {
    type: ActionTypes.GET_PRODUCTS,
    payload: data,
  };
};
