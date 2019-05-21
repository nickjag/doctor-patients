import React from 'react';

import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import { history } from '../configure_store';

import RequireAuth from './auth/require_auth';
import RequireNoAuth from './auth/require_no_auth';
import Login from './login/login';
import Logout from './logout/logout';
import Patients from './patients/patients';
import Patient from './patient/patient';

import Header from './header/header';
import NotFound from './notfound';

// Composed Components

const LoginWithNoAuth = RequireNoAuth(Login);
const PatientsWithAuth = RequireAuth(Patients);
const PatientWithAuth = RequireAuth(Patient);

const App = () => (
  <ConnectedRouter history={history}>
    <React.Fragment>
      <Header />
      <article>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route path="/login" component={LoginWithNoAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/patients" component={PatientsWithAuth} />
          <Route path="/patient/:user" component={PatientWithAuth} />
          <Route path="/" component={NotFound} />
        </Switch>
      </article>
    </React.Fragment>
  </ConnectedRouter>
);

export default App;
