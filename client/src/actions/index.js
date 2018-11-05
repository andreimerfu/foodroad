import axios from 'axios';
import * as moment from 'moment';

import { LOGIN_SUCCESS,
         LOGIN_FAILURE,
         REGISTER_FAILURE,
         LOGOUT
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

