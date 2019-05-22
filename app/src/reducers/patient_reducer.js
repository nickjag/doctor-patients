import { mapKeys } from 'lodash';

import {
  RESET_ALL,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_ERROR,
  FETCH_PATIENTS_RESET,
  FETCH_PATIENT_REQUEST,
  FETCH_PATIENT_SUCCESS,
  UPDATE_PATIENT_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  patientsIds: [],
  patientsById: {},
  patientsPage: 1,
  patientsQuery: null,
  patientsMax: false,
  patient: null,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_PATIENTS_SUCCESS:
      return {
        ...state,
        patientsPage: action.payload.page,
        patientsQuery: action.payload.query,
        patientsMax: false,
        patientsIds: state.patientsIds.concat(
          action.payload.patients.map(patient => patient.id),
        ),
        patientsById: {
          ...state.patientsById,
          ...mapKeys(action.payload.patients, 'id'),
        },
      };

    case FETCH_PATIENTS_ERROR:
      return {
        ...state,
        patientsMax: true,
      };

    case FETCH_PATIENTS_RESET:
      return {
        ...state,
        patientsPage: 1,
        patientsQuery: null,
        patientsMax: true,
        patientsIds: [],
        patientsById: {},
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
