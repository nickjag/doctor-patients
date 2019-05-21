import axios from 'axios';

import {
  isAuthError,
  isServerError,
  validationError,
  getErrorMsg,
  returnSubmissionErrors,
} from './utilities/errors';

import {
  RESET_ALL,
  INTERFACE_REQUEST,
  INTERFACE_COMPLETE,
} from './actions/types';
import * as urls from './constants/urls';

const interfaceRequest = () => ({
  type: INTERFACE_REQUEST,
});

const interfaceComplete = () => ({
  type: INTERFACE_COMPLETE,
});

const configDefaults = {
  throwFormError: null, // field/form errors to throw (set by middleware)
  errorMsg: null, // general error display msg (set by middleware)
};

const instances = {
  apiWithAuth: {
    obj: axios.create(configDefaults),
    interceptors: ['withLoader', 'errorHandling', 'withAuthentication'],
  },
  apiPublic: {
    obj: axios.create(configDefaults),
    interceptors: ['withLoader', 'errorHandling'],
  },
};

const addAuthentication = (config, store) => {
  const { auth } = store.getState();
  // const token = window.localStorage.getItem('token');

  if (auth && auth.isAuth && auth.token) {
    config.headers = {
      Authorization: auth.token,
    };
  }

  return config;
};

const interceptors = (api, store) => ({
  errorHandling: () => {
    api.interceptors.response.use(
      response => response,
      error => {
        if (isServerError(error)) {
          window.location = urls.ERROR_SERVER;
        }

        if (isAuthError(error)) {
          store.dispatch({ type: RESET_ALL });

          // setTimeout(() => {
          //   window.sessionStorage.setItem('didTimeout', 'true');
          //   window.localStorage.clear();
          //   window.location = urls.LOGIN;
          // }, 300);
        }

        if (validationError(error)) {
          error.config.throwFormError = returnSubmissionErrors(error);
        }

        error.config.errorMsg = getErrorMsg(error);
        return Promise.reject(error);
      },
    );
  },
  withAuthentication: () => {
    api.interceptors.request.use(
      config => addAuthentication(config, store),
      error => Promise.reject(error),
    );
  },
  withLoader: () => {
    api.interceptors.request.use(
      config => {
        store.dispatch(interfaceRequest(config.loader || {}));
        return config;
      },
      error => Promise.reject(error),
    );

    api.interceptors.response.use(
      response => {
        store.dispatch(interfaceComplete());
        return response;
      },
      error => {
        store.dispatch(interfaceComplete());
        return Promise.reject(error);
      },
    );
  },
});

export default store => {
  Object.keys(instances).forEach(name => {
    const instance = instances[name];
    instance.interceptors.forEach(func =>
      interceptors(instance.obj, store)[func](),
    );
  });
};

export const apiWithAuth = instances.apiWithAuth.obj;
export const apiPublic = instances.apiPublic.obj;
