export const required = value =>
  value ? undefined : 'Oops! This field is required.';

export const requiredTerms = value =>
  value
    ? undefined
    : 'To use the service, you must agree with our Terms of Service.';

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Oops! That's not a valid email address."
    : undefined;

export const minLength = min => value =>
  value && value.length < min
    ? `Oops! This field must be ${min} characters or more`
    : undefined;

export const minLength2 = minLength(2);
export const minLength5 = minLength(5);

export const phoneNumber = value =>
  value && !(value.match(/\d/g).length === 10)
    ? 'Oops! Your phone number must be 10 digits.'
    : undefined;

export const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;

export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;

export const positiveNumber = minValue(0);

// ---- not used below ----

// const maxLength = max => value =>
//   value && value.length > max ? `Must be ${max} characters or less` : undefined
// const maxLength15 = maxLength(15);

// const tooOld = value =>
//   value && value > 65 ? 'You might be too old for this' : undefined

// const aol = value =>
//   value && /.+@aol\.com/.test(value)
//     ? 'Really? You still use AOL for your email?'
//     : undefined

// const alphaNumeric = value =>
//   value && /[^a-zA-Z0-9 ]/i.test(value)
//     ? 'Only alphanumeric characters'
//     : undefined
