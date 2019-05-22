import React from 'react';
import PatientRow from './patient_row';

const PatientsTable = ({ patientsIds, patientsById, handleClickPatient }) => (
  <div className="table selectable">
    <div className="tr-head">
      <div className="td" />
      <div className="td">Name</div>
      <div className="td">Email</div>
      <div className="td">Username</div>
      <div className="td">City</div>
    </div>
    {patientsIds.map((patientId, i) => (
      <PatientRow
        key={patientsById[patientId].id}
        index={i}
        {...patientsById[patientId]}
        onClickPatient={handleClickPatient}
      />
    ))}
  </div>
);

export default PatientsTable;
