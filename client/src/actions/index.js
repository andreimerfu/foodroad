import axios from 'axios';
import * as moment from 'moment';
import StateLoader from "../reducers/StateLoader"

import { LOGIN_SUCCESS,
         LOGIN_FAILURE,
         REGISTER_SUCCESS,
         REGISTER_FAILURE,
         LOGOUT,
         PASSWORD_CHANGED_SUCCESS,
         PASSWORD_CHANGED_FAILURE,
         FETCH_RESTAURANTS,
         FETCH_RESTAURANT_CATEGORIES_SUCCESS,
         FETCH_RESTAURANT_BY_ID_INIT,
         FETCH_RESTAURANT_PRODUCTS_SUCCESS,
         GET_RESTAURANT_INFO_SUCCESS,
         FETCH_USER_PROFILE_SUCCESS,
         ADD_TO_CART,
         UPDATE_CART,
         REMOVE_ITEM,
         UPDATE_QUANTITY,
         SYNC_QUANTITY,
         HISTORY_ORDERS,
         ACTIVE_ORDERS,
         CHECKOUT_ORDER_SUCCESS
       } from './types';

/*-------------------------------------------*\
    Auth
\*-------------------------------------------*/
    /**
     *
     *  CONSTS
     *
     */

const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS,
  }
}

const loginFailure = (errors) => {
  return {
    type: LOGIN_FAILURE,
    errors
  }
}

const logoutSuccess = () => {
  return {
    type: LOGOUT
  }
}

const registerFailure = (errors) => {
  return {
    type: REGISTER_FAILURE,
    errors
  }
}

const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS
  }
}

const passwordChangedSuccess = () => {
  return {
    type: PASSWORD_CHANGED_SUCCESS
  }
}

const passwordChangedFailure = (errors) => {
  return {
    type: PASSWORD_CHANGED_FAILURE,
    errors
  }
}

/**
     *
     *  Actions
     *
     */

export const register = (userData) => {
  var confirm_success_url = window.location.href + "login";
  return dispatch => {
    return axios.post('/auth', {...userData, confirm_success_url})
      .then(res => {
        dispatch(registerSuccess());
      })
      .catch(error => {
        dispatch(registerFailure(error.response.data.errors.full_messages));
      })
    }
}


export const checkAuthState = () => {
  return dispatch => {
    const expire = localStorage.getItem('expiry');
    if (moment().isBefore(moment.unix(expire))) {
      dispatch(loginSuccess());
    }
  }
}

export const login = (userData) => {
  return dispatch => {
    return axios.post('/auth/sign_in', {...userData})
      .then(res => {
        localStorage.setItem('uid', res.headers['uid']);
        localStorage.setItem('client', res.headers['client']);
        localStorage.setItem('accessToken', res.headers['access-token']);
        localStorage.setItem('expiry', res.headers['expiry']);
        localStorage.setItem('role', res.data.data.role);
        dispatch(loginSuccess())
      })
      .catch(error => {
        dispatch(loginFailure(error.response.data.errors));
      })
  }
}


export const logout = () => {
  return dispatch => {
    return axios.delete('/auth/sign_out', {
      headers : {
        'uid': localStorage.getItem('uid'),
        'client': localStorage.getItem('client'),
        'access-token': localStorage.getItem('accessToken'),
        'expiry': localStorage.getItem('expiry'),
        'role': localStorage.getItem('role')
      }
    })
    .then(res => {
      invalidateUser();
      dispatch(logoutSuccess());
    })
    .catch(error => {
      console.log(error);
    })
  }
}

export const changePassword = (password, password_confirmation) => {
  return dispatch => {
    return axios.put('/auth/password', {
      password: password,
      password_confirmation: password_confirmation
    },
    {
      headers: {
        'uid': localStorage.getItem('uid'),
        'client': localStorage.getItem('client'),
        'access-token': localStorage.getItem('accessToken'),
        'expiry': localStorage.getItem('expiry'),
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      dispatch(passwordChangedSuccess());
    }).catch(error => {
      dispatch(passwordChangedFailure(error.response.data.errors.full_messages));
    })
  }
}

const invalidateUser = () => {
  localStorage.removeItem('uid');
  localStorage.removeItem('client');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('expiry');
  localStorage.removeItem('role');
}

//_________________________________________________________________


export const fetchRestaurants = (restaurants) => {
   return {
    type: FETCH_RESTAURANTS,
    restaurants: restaurants
  }
}

 const fetchRestaurantCategoriesSuccess = (categories) => {
  return {
    type: FETCH_RESTAURANT_CATEGORIES_SUCCESS,
    categories
  }
};

const getRestaurantInfoSuccess = (restaurant) => {
  return {
    type: GET_RESTAURANT_INFO_SUCCESS,
    restaurant
  }
}

const fetchRestaurantProductsSuccess = (products) => {
  return {
    type: FETCH_RESTAURANT_PRODUCTS_SUCCESS,
    products
  }
}


export const getRestaurants = (latLng, search) => {
  return dispatch => {
    return axios.get('api/v1/restaurants', {
        params: {
          lat: latLng.lat,
          lng: latLng.lng,
          search: search
        },
        headers: {
        'uid': localStorage.getItem('uid'),
        'client': localStorage.getItem('client'),
        'access-token': localStorage.getItem('accessToken'),
        'expiry': localStorage.getItem('expiry'),
      }
      })
      .then(res => {
        dispatch(fetchRestaurants(res.data.data));
      })
      .catch(error => {
        console.log("error");
        console.log(error);
      })
  }
}

export const fetchRestaurantCategories = (restaurantId) => {
  return dispatch => {
    axios.get(`/api/v1/restaurants/${restaurantId}/categories`).then((response) => {
      dispatch(fetchRestaurantCategoriesSuccess(response.data.data));
    }).catch(error => {
      console.log("eroare mare")
    })
  }
}

export const fetchRestaurantProducts = (id) => {
  return dispatch => {
    axios.get(`/api/v1/restaurants/${id}/products`).then((response) => {
      dispatch(fetchRestaurantProductsSuccess(response.data.data));
    }).catch(error => {
      console.log("Error fetchRestaurantProducts action");
    })
  }
}

export const getRestaurantInfo = (id) => {
  return dispatch => {
    axios.get(`/api/v1/restaurants/${id}`).then((response) => {
      dispatch(getRestaurantInfoSuccess(response.data.data));
    }).catch(error => {
      console.log("Eroare getRestaurantInfo");
    })
  }
}

export const getRestaurantInfoByManager = (manager_id) => {
  return dispatch => {
    axios.get(`/api/v1/restaurants/find_by_manager/${manager_id}`).then((response) => {
      dispatch(getRestaurantInfoSuccess(response.data.data));
    }).catch(error => {
      console.log("Error in getRestaurantInfoByManager");
    })
  }
}

export const registerRestaurant = (restaurantData) => {
  return dispatch => {
    return axios.post('/api/v1/restaurants', {...restaurantData})
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        dispatch(registerFailure(error.response.data.errors.full_messages));
      })
    }
}

/*-------------------------------------------*\
    User profile
\*-------------------------------------------*/
    /**
     *
     *  User info
     *
     */

const fetchUserProfileSuccess = (profile) => {
  return {
    type: FETCH_USER_PROFILE_SUCCESS,
    profile
  }
}

export const getUserProfile = () => {
  return dispatch => {
    return axios.get(`/api/v1/profiles`, {
       headers: {
        'uid': localStorage.getItem('uid'),
        'client': localStorage.getItem('client'),
        'access-token': localStorage.getItem('accessToken'),
        'expiry': localStorage.getItem('expiry'),
      }
    }).then((response) => {
      dispatch(fetchUserProfileSuccess(response.data.data));
    }).catch(error => {
      console.log("Error fetchUserProfileSuccess action");
    })
  }
}

export const addProfileAddress = (address, tag) => {
  const valid_address = {
    "addresses": [
      {
        "address": address,
        "tag": tag
      }
    ]
  }
  return dispatch => {
    return axios.put(`/api/v1/profiles`, valid_address, {
      headers: {
        'uid': localStorage.getItem('uid'),
        'client': localStorage.getItem('client'),
        'access-token': localStorage.getItem('accessToken'),
        'expiry': localStorage.getItem('expiry'),
        'token-type': 'Bearer',
      }
    }).then((response) => {
      console.log("success");
    }).catch(error => {
      console.log("error add profile address");
    })
  }
}

/*-------------------------------------------*\

\*-------------------------------------------*/
    /**
     *
     *
     *
     */

export const checkCuiAction = (restaurant_id) => {
  return dispatch => {
    return axios.put(`/api/v1/restaurants/${restaurant_id}`, { check_cui: true },  {
      headers: {
        'uid': localStorage.getItem('uid'),
        'client': localStorage.getItem('client'),
        'access-token': localStorage.getItem('accessToken'),
        'expiry': localStorage.getItem('expiry'),
        'token-type': 'Bearer',
      }
    }).then((response) => {
      console.log(response);
    }).catch(error => {
      console.log("error checkCuiAction");
    })
  }
};

export const updateRestaurantInfo = (restaurant_id, informations) => {
  return dispatch => {
    return axios.put(`/api/v1/restaurants/${restaurant_id}`, informations, {
      headers: {
        'uid': localStorage.getItem('uid'),
        'client': localStorage.getItem('client'),
        'access-token': localStorage.getItem('accessToken'),
        'expiry': localStorage.getItem('expiry'),
        'token-type': 'Bearer',
      }
    }).then((response) => {
      console.log(response);
    }).catch(error => {
      console.log("error updateRestaurantInfo");
    })
  }
};

//===============================================
//===========Shopping Cart actions===============
//===============================================

export function addToCart(payload) {
  return {
    type: ADD_TO_CART,
    payload: payload
  }
}

export function updateCart(payload) {
  return {
    type: UPDATE_CART,
    payload: payload
  }
}

export function removeItem(payload) {
  return {
    type: REMOVE_ITEM,
    payload: payload
  }
}

export function updateQuantity(payload) {
  return {
    type: UPDATE_QUANTITY,
    payload: payload
  }
}

export function syncQuantity(payload) {
  return {
    type: SYNC_QUANTITY,
    payload: payload
  }
}

//===============================================
//===============Orders actions==================
//===============================================

const fetchActiveOrdersSuccess = (orders) => {
  return {
    type: ACTIVE_ORDERS,
    orders
  }
}
const fetchHistoryOrdersSuccess = (orders) => {
  return {
    type: HISTORY_ORDERS,
    orders
  }
}

const checkoutOrderSuccess = () => {
  return {
    type: CHECKOUT_ORDER_SUCCESS,
  }
}
export const fetchActiveOrders = (restaurant_id) => {
  return dispatch => {
    return axios.get(`/api/v1/restaurants/${restaurant_id}/orders`, {
       headers: {
        'uid': localStorage.getItem('uid'),
        'client': localStorage.getItem('client'),
        'access-token': localStorage.getItem('accessToken'),
        'expiry': localStorage.getItem('expiry'),
      }
    }).then((response) => {
      dispatch(fetchActiveOrdersSuccess(response.data.data));
    }).catch(error => {
      console.log("Error in fetchOrders");
    })
  }
}

export const fetchOrders = () => {
  return dispatch => {
    return axios.get(`/api/v1/profiles/orders`, {
       headers: {
        'uid': localStorage.getItem('uid'),
        'client': localStorage.getItem('client'),
        'access-token': localStorage.getItem('accessToken'),
        'expiry': localStorage.getItem('expiry'),
      }
    }).then((response) => {
      dispatch(fetchHistoryOrdersSuccess(response.data.data));
    }).catch(error => {
      console.log("Error in fetchOrders");
    })
  }
}

export const checkoutOrder = (cartDetails) => {
  return dispatch => {
    return axios.post(`/api/v1/orders`, cartDetails, {
      headers: {
        'uid': localStorage.getItem('uid'),
        'client': localStorage.getItem('client'),
        'access-token': localStorage.getItem('accessToken'),
        'expiry': localStorage.getItem('expiry'),
      }
    }).then((response) => {
      // refactor this please :)
      const stateLoader = new StateLoader();
      var serialState = stateLoader.loadState();
      serialState.cart = []
      stateLoader.saveState(serialState);
      dispatch(checkoutOrderSuccess());
    }).catch(error => {
      console.log("Error in checkoutOrder");
    })
  }
}

export const facebookLogin = (response) => {
  return dispatch => {
    return axios.post(`/api/v1/auth/facebook_login`, response)
      .then(res => {
        localStorage.setItem('uid', res.headers['uid']);
        localStorage.setItem('client', res.headers['client']);
        localStorage.setItem('accessToken', res.headers['access-token']);
        localStorage.setItem('expiry', res.headers['expiry']);
        localStorage.setItem('role', res.data.data.attributes.role);
        dispatch(loginSuccess())
      }).catch(error => {
        console.log("Error facebook login");
      })
  }
}
