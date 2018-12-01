import axios from 'axios';
import * as moment from 'moment';

import { LOGIN_SUCCESS,
         LOGIN_FAILURE,
         REGISTER_FAILURE,
         LOGOUT,
         FETCH_RESTAURANTS,
         FETCH_RESTAURANT_CATEGORIES_SUCCESS,
         FETCH_RESTAURANT_BY_ID_INIT,
         FETCH_RESTAURANT_PRODUCTS_SUCCESS,
         GET_RESTAURANT_INFO_SUCCESS,
         FETCH_USER_PROFILE_SUCCESS,
         PASSWORD_CHANGED_SUCCESS
       } from './types';

//_________________________________________________________________
// AUTH ACTIONS

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

const passwordChangedSuccess = () => {
  return {
    type: PASSWORD_CHANGED_SUCCESS
  }
}

export const register = (userData) => {
  var confirm_success_url = window.location.href + "login";
  return dispatch => {
    return axios.post('/auth', {...userData, confirm_success_url})
      .then(res => {

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
    }).then(res => {
      dispatch(passwordChangedSuccess());
    }).catch(error => {
      console.log(error);
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

const fetchUserProfileSuccess = (profile) => {
  return {
    type: FETCH_USER_PROFILE_SUCCESS,
    profile
  }
}

export const getRestaurants = (latLng, search) => {
  return dispatch => {
    return axios.get('api/v1/restaurants', {
        params: {
          lat: latLng.lat,
          lng: latLng.lng,
          search: search
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
}
