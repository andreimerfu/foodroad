import {
  ADD_TO_CART,
  UPDATE_CART,
  REMOVE_ITEM,
  UPDATE_QUANTITY,
  SYNC_QUANTITY
} from '../actions/types';
import StateLoader from "./StateLoader"

export const cartReducer = (state = [], action) => {
  const stateLoader = new StateLoader();
  const serialState = stateLoader.loadState().cart;

  if (serialState) {
    state = serialState;
  }

  if (state.length > 0 && action.payload && action.payload.restaurant) {
    if (state[0].restaurant !== action.payload.restaurant) {
      state = []
    }
  }

  switch(action.type) {
    case "ADD_TO_CART": {
      return [
        ...state, action.payload
      ]
      break;
    }
    case "UPDATE_CART": {
      return state.map((item, index) => {
        if (index !== action.index) {
          return item;
        }

        return [
          ...state,
          ...action.payload
        ]
      });
    }
    case "REMOVE_ITEM": {
      const itemIndex = state.findIndex(i => i.item === action.payload);
      return state.filter((item, index) => index != itemIndex);
    }
  }
  return state;
}
