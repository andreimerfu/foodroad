import { HISTORY_ORDERS ,
         CHECKOUT_ORDER_SUCCESS,
         ACTIVE_ORDERS
       } from '../actions/types';

const INITIAL_STATE = {
  orders: {
    data: []
  },

  activeOrders: {
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

export const activeOrdersReducer = (state = INITIAL_STATE.activeOrders, action) => {
  switch(action.type) {
    case ACTIVE_ORDERS:
      return Object.assign({}, state, {data: action.orders});
     default:
      return state;
  }
}
