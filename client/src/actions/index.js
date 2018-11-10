import axios from 'axios';
import * as moment from 'moment';

import { LOGIN_SUCCESS,
         LOGIN_FAILURE,
         REGISTER_FAILURE,
         LOGOUT,
         FETCH_RESTAURANTS
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

export const register = (userData) => {
  var confirm_success_url = "http://localhost:3001/login";
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
        'expiry': localStorage.getItem('expiry')
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

const invalidateUser = () => {
  localStorage.removeItem('uid');
  localStorage.removeItem('client');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('expiry');
}

//_________________________________________________________________
// RESTAURANT ACTIONS
const restaurants = [{
          "id": "ONE1",
          "title": "Mon Paris",
          "street": "Some fake street",
          "category": "International",
          "image": "http://via.placeholder.com/350x250",
          "km": "2.12 km",
          "description": "Very nice apartment in center of the city.",
          "daily_rate": 35,
          "created_at": "12/10/2018"
          },
          {
          "id": "TWO2",
          "title": "Karamna",
          "street": "Some fake street",
          "category": "Asiatic",
          "image": "http://via.placeholder.com/350x250",
          "km": "1.5 km",
          "description": "Very nice apartment in center of the city.",
          "daily_rate": 20,
          "created_at": "12/10/2018"
          },
          {
          "id": "THREE3",
          "title": "BAZ Bistro",
          "street": "Some fake street",
          "category": "American",
          "image": "http://via.placeholder.com/350x250",
          "km": "0.3km",
          "description": "Very nice apartment in center of the city.",
          "daily_rate": 45,
          "created_at": "12/10/2018"
          },
          {
          "id": "TWO4",
          "title": "Dineș",
          "street": "Some fake street",
          "category": "Traditional",
          "image": "http://via.placeholder.com/350x250",
          "km": "1.25km",
          "description": "Very nice apartment in center of the city.",
          "daily_rate": 100,
          "created_at": "12/10/2018"
          },
          {
          "id": "TWO4",
          "title": "Dineș",
          "street": "Some fake street",
          "category": "Traditional",
          "image": "http://via.placeholder.com/350x250",
          "km": "1.25km",
          "description": "Very nice apartment in center of the city.",
          "daily_rate": 100,
          "created_at": "12/10/2018"
          },
          {
          "id": "TWO4",
          "title": "Dineș",
          "street": "Some fake street",
          "category": "Traditional",
          "image": "http://via.placeholder.com/350x250",
          "km": "1.25km",
          "description": "Very nice apartment in center of the city.",
          "daily_rate": 100,
          "created_at": "12/10/2018"
          },
          {
          "id": "TWO4",
          "title": "Dineș",
          "street": "Some fake street",
          "category": "Traditional",
          "image": "http://via.placeholder.com/350x250",
          "km": "1.25km",
          "description": "Very nice apartment in center of the city.",
          "daily_rate": 100,
          "created_at": "12/10/2018"
          },
          {
          "id": "TWO4",
          "title": "Dineș",
          "street": "Some fake street",
          "category": "Traditional",
          "image": "http://via.placeholder.com/350x250",
          "km": "1.25km",
          "description": "Very nice apartment in center of the city.",
          "daily_rate": 100,
          "created_at": "12/10/2018"
          }];

export const fetchRestaurants = () => {
   return {
    type: FETCH_RESTAURANTS,
    restaurants: restaurants
  }
}
