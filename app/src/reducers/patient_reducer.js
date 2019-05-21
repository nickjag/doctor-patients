import { mapKeys } from 'lodash';

import {
  RESET_ALL,
  FETCH_PATIENTS_REQUEST,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENT_REQUEST,
  FETCH_PATIENT_SUCCESS,
  UPDATE_PATIENT_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  allPatientIds: null,
  patientsById: null,
  patient: null,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_PATIENTS_REQUEST:
      return {
        ...state,
        allPatientIds: null,
        patientsById: false,
      };

    case FETCH_PATIENTS_SUCCESS:
      return {
        ...state,
        allPatientIds: action.payload.patients.map(patient => patient.id),
        patientsById: mapKeys(action.payload.patients, 'id'),
      };

    case FETCH_PATIENT_REQUEST:
      return {
        ...state,
        patient: null,
      };

    case FETCH_PATIENT_SUCCESS:
      return {
        ...state,
        patient: action.payload,
      };

    case UPDATE_PATIENT_SUCCESS:
      return {
        ...state,
        patient: action.payload,
      };

    case RESET_ALL:
      return INITIAL_STATE;

    default:
      return state;
  }
}
