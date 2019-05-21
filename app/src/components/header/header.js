import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import * as actions from '../../actions';
import * as urls from '../../constants/urls';
import { DOCTOR } from '../../constants/user_types';
import './header.scss';

const PatientNav = () => (
  <NavLink to="/" className="nav-link">
    My Profile
  </NavLink>
);

const DoctorNav = () => (
  <NavLink to="/patients" className="nav-link">
    All Patients
  </NavLink>
);

const AcctHeader = props => {
  const prefix = props.userType === DOCTOR ? 'Dr.' : '';
  const welcomeMsg = `Welcome, ${prefix} ${props.name}`;

  return (
    <div className="acct vcenter">
      <p>{welcomeMsg}</p>
      {props.userType === DOCTOR ? <DoctorNav /> : <PatientNav />}
      <NavLink to={urls.LOGOUT} className="nav-link">
        Log Out
      </NavLink>
    </div>
  );
};

const Header = props => (
  <div className="header">
    <div className="contain">
      <div className="logo vcenter">Doctor-Patient</div>
      {props.isAuth && (
        <AcctHeader name={props.name} userType={props.userType} />
      )}
    </div>
  </div>
);

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuth,
    userType: state.auth.userType,
    name: state.auth.name,
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    actions,
  )(Header),
);
