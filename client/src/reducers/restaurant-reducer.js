import { FETCH_RESTAURANTS,
				 FETCH_RESTAURANT_CATEGORIES_SUCCESS,
         FETCH_RESTAURANT_BY_ID_INIT,
         GET_RESTAURANT_INFO_SUCCESS
       } from '../actions/types';

const INITIAL_STATE = {
  restaurants: {
    data: []
  },

  categories: {
    data: []
  }
}

export const restaurantReducer = (state = INITIAL_STATE.restaurants, action) => {
  switch(action.type) {
    case FETCH_RESTAURANTS:
      return Object.assign({}, state, {data: action.restaurants});
    case GET_RESTAURANT_INFO_SUCCESS:
      return Object.assign({}, state, {data: action.restaurant});
     default:
      return state;
  }
}


export const restaurantCategoriesReducer = (state = INITIAL_STATE.categories, action) => {
  switch(action.type) {
    case FETCH_RESTAURANT_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {data: action.categories});
    default:
      return state;
  }
}
