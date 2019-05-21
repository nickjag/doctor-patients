import {
  RESET_ALL,
  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS,
  UPDATE_PATIENT_SUCCESS,
} from '../actions/types';

import { PATIENT } from '../constants/user_types';

const INITIAL_STATE = {
  id: null,
  token: null,
  isAuth: false,
  userType: null,
  username: null,
  name: null,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER_REQUEST:
      return {
        ...state,
        id: null,
        isAuth: false,
        userType: null,
        username: null,
        name: null,
      };

    case AUTH_USER_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        token: action.payload.token,
        isAuth: true,
        userType: action.payload.userType,
        username: action.payload.username,
        name: action.payload.name,
      };

    case UPDATE_PATIENT_SUCCESS:
      return {
        ...state,
        name:
          state.userType === PATIENT
            ? `${action.payload.firstName} ${action.payload.lastName}`
            : state.name,
      };

    case RESET_ALL:
      return INITIAL_STATE;

    default:
      return state;
  }
}
