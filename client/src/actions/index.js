import axios from 'axios';
import * as moment from 'moment';

import { LOGIN_SUCCESS,
         LOGIN_FAILURE,
         LOGOUT
       } from './types';

//_________________________________________________________________
// AUTH ACTIONS

const loginSuccess = (uid, client, accessToken, expiry) => {
  return {
    type: LOGIN_SUCCESS,
    uid, client, accessToken, expiry
  }
}

const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    error
  }
}

const logoutSuccess = () => {
  return {
    type: LOGOUT
  }
}

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem('access-token');
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
        const uid = res.headers['uid']
        const client = res.headers['client']
        const accessToken = res.headers['access-token']
        const expiry = res.headers['expiry']
        localStorage.setItem('uid', uid);
        localStorage.setItem('client', client);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('expiry', expiry);
        dispatch(loginSuccess(uid, client, accessToken, expiry))
      })
      .catch(error => {
        dispatch(loginFailure(error));
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

