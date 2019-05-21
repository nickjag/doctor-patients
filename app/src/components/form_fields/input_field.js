import React from 'react';

const InputField = props => {
  const {
    fieldClass,
    input,
    label,
    helper,
    type,
    name,
    disabled,
    placeholder,
    meta: { touched, error },
  } = props;

  const hasError = !!(touched && error);

  let allClasses = fieldClass;
  allClasses += hasError ? ' error' : '';
  allClasses += disabled ? ' disabled' : '';
  console.log('check disabled', disabled);
  return (
    <fieldset className={allClasses}>
      {label && <div className="label">{label}</div>}
      {helper && <div className="label-helper">{helper}</div>}
      <input
        className="field-input"
        name={name}
        type={type}
        {...input}
        placeholder={placeholder}
        disabled={disabled && 'disabled'}
      />
      {touched && (error && <div className="msg error">{error}</div>)}
    </fieldset>
  );
};

export default InputField;
