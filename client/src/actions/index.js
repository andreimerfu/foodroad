import axios from 'axios';
import * as moment from 'moment';

import { LOGIN_SUCCESS,
         LOGIN_FAILURE
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
