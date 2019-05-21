import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { loginUser, hideLoader, showLoader } from '../../actions';

import InputField from '../form_fields/input_field';
import * as val from '../../utilities/validation';

class Login extends Component {
  handleFormSubmit(formValues) {
    return this.props.loginUser(formValues, this.props.history);
  }

  render() {
    const { handleSubmit, error, isAuth } = this.props;

    if (isAuth) {
      return null;
    }

    return (
      <React.Fragment>
        <section className="heading">
          <h1>Login</h1>
        </section>
        <section>
          <form
            className="center"
            onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
          >
            <Field
              name="username"
              placeholder="Username"
              fieldClass="field-group"
              type="text"
              label="Username"
              validate={[val.required, val.minLength5]}
              component={InputField}
            />
            <Field
              name="password"
              placeholder="Password"
              fieldClass="field-group"
              type="password"
              label="Password"
              validate={[val.required, val.minLength5]}
              component={InputField}
            />
            <div className="full">
              <button className="btn dark" type="submit">
                Login
              </button>
              {error && <div className="msg error">{error}</div>}
            </div>
          </form>
        </section>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    id: state.auth.id,
    isAuth: state.auth.isAuth,
  };
}

Login = reduxForm({
  form: 'login',
})(Login);

Login = connect(
  mapStateToProps,
  {
    loginUser,
    hideLoader,
    showLoader,
  },
)(Login);

export default Login;
