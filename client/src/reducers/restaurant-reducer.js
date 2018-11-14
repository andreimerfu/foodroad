import { FETCH_RESTAURANTS,
				 FETCH_RESTAURANT_BY_ID_SUCCESS,
         FETCH_RESTAURANT_BY_ID_INIT 
       } from '../actions/types';

const INITIAL_STATE = {
  restaurants: {
    data: []
  },

  restaurant: {
    data: []
  }

}

export const restaurantReducer = (state = INITIAL_STATE.restaurants, action) => {
  switch(action.type) {
    case FETCH_RESTAURANTS:
      return Object.assign({}, state, {data: action.restaurants});
     default:
      return state;
  }
}


export const selectedRestaurantReducer = (state = INITIAL_STATE.restaurant, action) => {
  switch(action.type) {
    // case FETCH_RESTAURANT_BY_ID_INIT:
    //   return {...state, data: {} };
    case FETCH_RESTAURANT_BY_ID_SUCCESS:
      return Object.assign({}, state, {data: action.restaurant});
      // debugger;
      // return {...state, data: action.restaurant}

    default:
      return state;
  }
}