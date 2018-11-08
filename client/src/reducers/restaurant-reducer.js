import { FETCH_RESTAURANTS } from '../actions/types';

 const INITIAL_STATE = {
  data: []
}

export const restaurantReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_RESTAURANTS:
      return Object.assign({}, state, {data: action.restaurants});
     default:
      return state;
  }
}
