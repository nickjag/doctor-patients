import React, { Component } from 'react';
import { connect } from 'react-redux';
import PatientsTable from './patients_table';
import PatientSearch from './patient_search';

import * as actions from '../../actions';
import * as urls from '../../constants/urls';
import { DOCTOR } from '../../constants/user_types';

class Patients extends Component {
  constructor(props) {
    super(props);

    this.handleClickPatient = this.handleClickPatient.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    if (!this.props.patientsIds.length) {
      this.fetchPatients(1);
    }
  }

  handleClickPatient(username) {
    this.props.history.push(`${urls.PATIENT}/${username}`);
  }

  handleLoadMore() {
    const nextPage = this.props.patientsPage + 1;
    this.fetchPatients(nextPage, this.props.patientsQuery);
  }

  handleSearch(query) {
    this.props.resetPatients();
    this.fetchPatients(this.props.patientsPage, query);
  }

  fetchPatients(page, query = null) {
    this.props.fetchPatients(page, query);
  }

  render() {
    const {
      isAuth,
      userType,
      patientsIds,
      patientsById,
      patientsMax,
    } = this.props;

    if (!isAuth || userType !== DOCTOR) {
      return null;
    }

    const hasResults = patientsIds && patientsIds.length;

    return (
      <React.Fragment>
        <section className="heading">
          <h1>Patients</h1>
        </section>
        <section className="center heading">
          <PatientSearch
            initQuery={this.props.patientsQuery}
            handleSearch={this.handleSearch}
          />
        </section>
        <section>
          {hasResults ? (
            <PatientsTable
              patientsIds={patientsIds}
              patientsById={patientsById}
              handleClickPatient={this.handleClickPatient}
            />
          ) : (
            <div className="empty">
              No patients were found with that criteria.
            </div>
          )}
        </section>
        <section className="center heading">
          {!patientsMax && (
            <button type="button" className="btn" onClick={this.handleLoadMore}>
              Load More
            </button>
          )}
        </section>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuth,
    userType: state.auth.userType,
    patientsIds: state.patients.patientsIds,
    patientsById: state.patients.patientsById,
    patientsPage: state.patients.patientsPage,
    patientsQuery: state.patients.patientsQuery,
    patientsMax: state.patients.patientsMax,
  };
}

Patients = connect(
  mapStateToProps,
  actions,
)(Patients);

export default Patients;
