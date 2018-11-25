import { FETCH_USER_PROFILE_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  profile: {
    data: {}
  }
}

export const userProfileReducer = (state = INITIAL_STATE.profile, action) => {
  switch(action.type) {
    case FETCH_USER_PROFILE_SUCCESS:
      return Object.assign({}, state, {data: action.profile});
     default:
      return state;
  }
}
