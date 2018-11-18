import { FETCH_RESTAURANTS,
				 FETCH_RESTAURANT_CATEGORIES_SUCCESS,
         FETCH_RESTAURANT_BY_ID_INIT,
         GET_RESTAURANT_INFO_SUCCESS,
         FETCH_RESTAURANT_PRODUCTS_SUCCESS
       } from '../actions/types';

const INITIAL_STATE = {
  restaurants: {
    data: []
  },

  categories: {
    data: []
  },

  products: {
    data: []
  },

  restaurant: {
    data: {}
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

export const restaurantInfoReducer = (state = INITIAL_STATE.restaurant, action) => {
  switch(action.type) {
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

export const productsReducer = (state = INITIAL_STATE.products, action) => {
  switch(action.type) {
    case FETCH_RESTAURANT_PRODUCTS_SUCCESS:
      return Object.assign({}, state, {data: action.products});
    default:
      return state;
  }
}
