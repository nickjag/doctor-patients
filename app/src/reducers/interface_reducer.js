import {
  RESET_ALL,
  INTERFACE_REQUEST,
  INTERFACE_COMPLETE,
  INTERFACE_ERROR,
  SHOW_LOADER,
  HIDE_LOADER,
} from '../actions/types';

const INITIAL_STATE = {
  requests: 0,
  showLoader: false,
  error: null,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case INTERFACE_REQUEST:
      return { ...state, requests: state.requests + 1 };

    case INTERFACE_COMPLETE:
      return { ...state, requests: state.requests - 1 };

    case SHOW_LOADER:
      return { ...state, showLoader: true };

    case HIDE_LOADER:
      return { ...state, showLoader: false };

    case INTERFACE_ERROR:
      return { ...state, error: action.error };

    case RESET_ALL:
      return INITIAL_STATE;

    default:
      return state;
  }
}
