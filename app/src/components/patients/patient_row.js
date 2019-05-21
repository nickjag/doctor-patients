import React from 'react';

const PatientRow = props => {
  const {
    index,
    firstName,
    lastName,
    email,
    username,
    city,
    onClickPatient,
  } = props;

  return (
    <div className="tr" onClick={() => onClickPatient(username)}>
      <div className="td">{`${index + 1}.`}</div>
      <div className="td">{`${firstName} ${lastName}`}</div>
      <div className="td">{email}</div>
      <div className="td">{username}</div>
      <div className="td">{city}</div>
    </div>
  );
};

export default PatientRow;
