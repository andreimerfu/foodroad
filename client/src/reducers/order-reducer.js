import { HISTORY_ORDERS ,
         CHECKOUT_ORDER_SUCCESS
       } from '../actions/types';

const INITIAL_STATE = {
  orders: {
    data: []
  }
}

export const historyOrdersReducer = (state = INITIAL_STATE.orders, action) => {
  switch(action.type) {
    case HISTORY_ORDERS:
      return Object.assign({}, state, {data: action.orders});
     default:
      return state;
  }
}
