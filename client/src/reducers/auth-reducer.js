import { LOGIN_SUCCESS,
         LOGIN_FAILURE
        } from '../actions/types';

const INITIAL_STATE = {
  isAuth: false,
  client: null,
  accessToken: null,
  uid: null,
  expiry: null

}
export const authReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isAuth: true,
        uid: action.uid,
        client: action.client,
        accessToken: action.accessToken,
        expiry: action.expiry
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {});
    default:
      return state;
  }
}
