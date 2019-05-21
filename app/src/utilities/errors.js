import axios from 'axios';
import { SubmissionError } from 'redux-form';
import * as urls from '../constants/urls';

// error checker: auth

export const isAuthError = error =>
  !!(error.response && error.response.status === 401);

// error checker: server

export const isServerError = error =>
  !(error && error.response && error.response.data);

// error checker: validation

export const validationError = error =>
  !!(
    error.response &&
    (error.response.status === 422 || error.response.status === 400)
  );

// error checker: not found

export const isNotFoundError = error =>
  !!(error.response && error.response.status === 404);

// throw redux form errors

export const throwFormErrors = error => {
  if (error.config && error.config.throwFormError) {
    throw new SubmissionError(error.config.throwFormError);
  }
};

// get standard error message to return from an api call

export const getErrorMsg = error => returnGeneralError(error) || null;

// check for and return submission errors (to be thrown)

export const returnSubmissionErrors = (error, errorMap = null) => {
  const submissionErrors = {};

  if (returnFieldErrors(error)) {
    const fieldErrors = returnFieldErrors(error);

    for (const field in fieldErrors) {
      const errorMessage = fieldErrors[field].msg;
      const errorKey = errorMap && errorMap[field] ? errorMap[field] : field;

      submissionErrors[errorKey] = errorMessage;
    }

    if (Object.keys(submissionErrors).length > 0) {
      return submissionErrors;
    }
  }

  if (returnGeneralError(error)) {
    submissionErrors._error = returnGeneralError(error);

    if (Object.keys(submissionErrors).length > 0) {
      return submissionErrors;
    }
  }

  return false;
};

// error getter: field (form) errors

export const returnFieldErrors = error =>
  error.response && error.response.data && error.response.data.error_fields
    ? error.response.data.error_fields
    : false;

// error getter: general error

export const returnGeneralError = error =>
  error.response &&
  error.response.data &&
  error.response.data.error_message &&
  error.response.data.error_message != ''
    ? error.response.data.error_message
    : false;

// prep error report for alert system

export const prepErrorReport = error => ({
  label: error.config.label,
  url: error.config.url,
  time: error.config.responseTime,
  err: JSON.stringify(error),
});

// report error through alert system

export const reportError = ({ label, url, time, err }) => {
  const data = {
    name: label,
    url,
    time,
    state: localStorage.getItem('mhState'),
    raw: err,
  };

  return axios({
    method: 'post',
    // url: `${urls.REPORT_ERROR}`,
    data,
    withCredentials: true,
  })
    .then(response => data)
    .catch(error => ({ ...data, errorSending: true }));
};
