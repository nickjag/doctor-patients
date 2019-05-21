import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import authReducer from './auth_reducer';
import patientReducer from './patient_reducer';
import interfaceReducer from './interface_reducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    form,
    auth: authReducer,
    patients: patientReducer,
    interface: interfaceReducer,
  });
