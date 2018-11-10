import { LOGIN_SUCCESS,
         LOGIN_FAILURE,
         REGISTER_FAILURE,
         LOGOUT
        } from '../actions/types';

const INITIAL_STATE = {
  isAuth: false,
  client: null,
  accessToken: null,
  uid: null,
  expiry: null,
  errors: []

}
export const authReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isAuth: true,
        uid: action.uid,
        client: action.client,
        accessToken: action.accessToken,
        expiry: action.expiry,
        errors: []
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {errors: action.errors});
    case REGISTER_FAILURE:
      return Object.assign({}, state, {errors: action.errors});
    case LOGOUT:
      return Object.assign({}, state, {isAuth: false});
    default:
      return state;
  }
}
