import React, { Component } from 'react';
import { connect } from 'react-redux';
import PatientRow from './patient_row';
import * as actions from '../../actions';
import * as urls from '../../constants/urls';
import { DOCTOR } from '../../constants/user_types';
import './patients.scss';

class Patients extends Component {
  componentDidMount() {
    this.props.fetchPatients();
    this.handleClickPatient = this.handleClickPatient.bind(this);
  }

  handleClickPatient(username) {
    this.props.history.push(`${urls.PATIENT}/${username}`);
  }

  // fade times consistent
  // search
  // load more

  render() {
    const { isAuth, userType, allPatientIds, patientsById } = this.props;

    if (!isAuth || userType !== DOCTOR) {
      return null;
    }

    if (!allPatientIds || !allPatientIds.length) {
      return <div>No patients found.</div>;
    }

    return (
      <React.Fragment>
        <section className="heading">
          <h1>Patients</h1>
        </section>
        <section>
          <div className="table selectable">
            <div className="tr-head">
              <div className="td">Name</div>
              <div className="td">Email</div>
              <div className="td">Username</div>
              <div className="td">City</div>
            </div>
            {allPatientIds.map(patientId => (
              <PatientRow
                {...patientsById[patientId]}
                onClickPatient={this.handleClickPatient}
              />
            ))}
          </div>
        </section>
        <section>
          <button type="button" className="btn">
            Load More
          </button>
        </section>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuth,
    userType: state.auth.userType,
    allPatientIds: state.patients.allPatientIds,
    patientsById: state.patients.patientsById,
  };
}

Patients = connect(
  mapStateToProps,
  actions,
)(Patients);

export default Patients;
