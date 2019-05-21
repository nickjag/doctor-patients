import { SubmissionError } from 'redux-form';
import { isAuthError, throwFormErrors } from '../utilities/errors';

import {
  RESET_ALL,
  INTERFACE_REQUEST,
  INTERFACE_COMPLETE,
  HIDE_NOTIFICATION,
  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS,
  AUTH_USER_ERROR,
  FETCH_PATIENT_REQUEST,
  FETCH_PATIENT_SUCCESS,
  FETCH_PATIENT_ERROR,
  FETCH_PATIENTS_REQUEST,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_ERROR,
  FETCH_PATIENTS_RESET,
  UPDATE_PATIENT_REQUEST,
  UPDATE_PATIENT_SUCCESS,
  UPDATE_PATIENT_ERROR,
} from './types';

import * as urls from '../constants/urls';
import { API_URL } from '../constants/settings';
import { apiWithAuth, apiPublic } from '../api';

export const interfaceRequest = () => ({
  type: INTERFACE_REQUEST,
});

export const hideNotification = () => ({
  type: HIDE_NOTIFICATION,
});

export const interfaceComplete = () => ({
  type: INTERFACE_COMPLETE,
});

// login user

export const loginUser = vals => dispatch => {
  dispatch({ type: AUTH_USER_REQUEST });

  return apiPublic({
    method: 'post',
    url: `${API_URL}/users/login`,
    data: {
      username: vals.username,
      password: vals.password,
    },
  })
    .then(response => {
      // storeToken(response.data.token);

      dispatch({
        type: AUTH_USER_SUCCESS,
        payload: response.data,
      });
    })
    .catch(error => {
      throwFormErrors(error);

      if (isAuthError(error)) {
        throw new SubmissionError({
          _error: error.config.errorMsg,
        });
      }

      dispatch({
        type: AUTH_USER_ERROR,
        payload: error.config.errorMsg,
      });
    });
};

// logout

export const logoutUser = () => dispatch => {
  dispatch({
    type: RESET_ALL,
  });
  setTimeout(() => {
    window.location = urls.LOGIN;
  }, 200);
};

// all patients

export const fetchPatients = (page, query = null) => dispatch => {
  dispatch({ type: FETCH_PATIENTS_REQUEST });

  return apiWithAuth({
    method: 'get',
    url: `${API_URL}/patients`,
    params: {
      page,
      query,
    },
  })
    .then(response => {
      dispatch({
        type: FETCH_PATIENTS_SUCCESS,
        payload: {
          ...response.data,
          page,
          query,
        },
      });
    })
    .catch(error => {
      dispatch({
        type: FETCH_PATIENTS_ERROR,
        payload: error.config.errorMsg,
      });
    });
};

export const resetPatients = () => ({
  type: FETCH_PATIENTS_RESET,
});

// single patient

export const fetchPatientByUsername = username => dispatch => {
  dispatch({ type: FETCH_PATIENT_REQUEST });

  return apiWithAuth({
    method: 'get',
    url: `${API_URL}/patients/${username}`,
  })
    .then(response => {
      dispatch({
        type: FETCH_PATIENT_SUCCESS,
        payload: response.data,
      });
    })
    .catch(error => {
      if (isAuthError(error)) {
        logoutUser();
      }
      dispatch({
        type: FETCH_PATIENT_ERROR,
        payload: error.config.errorMsg,
      });
    });
};

// update patient

export const updatePatient = (userId, vals) => dispatch => {
  dispatch({ type: UPDATE_PATIENT_REQUEST });

  return apiWithAuth({
    method: 'patch',
    url: `${API_URL}/patients/${userId}`,
    data: vals,
  })
    .then(response => {
      dispatch({
        type: UPDATE_PATIENT_SUCCESS,
        payload: response.data,
      });
    })
    .catch(error => {
      dispatch({
        type: UPDATE_PATIENT_ERROR,
        payload: error.config.errorMsg,
      });
    });
};
