import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import InputField from '../form_fields/input_field';
import LeftArrow from '../icons/left_arrow';
import * as actions from '../../actions';
import * as userTypes from '../../constants/user_types';
import * as val from '../../utilities/validation';
import * as urls from '../../constants/urls';

class Patient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hadSuccess: false,
      hadError: false,
    };
  }

  componentDidMount() {
    const fetchUsername = this.props.match.params.user || null;

    if (fetchUsername) {
      this.props.fetchPatientByUsername(fetchUsername);
    }
  }

  componentDidUpdate(prevProps) {
    const { dirty, submitSucceeded, error } = this.props;
    const { hadSuccess, hadError } = this.state;

    if (submitSucceeded && !prevProps.submitSucceeded && !dirty) {
      this.setState({
        hadSuccess: true,
      });
    }

    if (error && !prevProps.error && !dirty) {
      this.setState({
        hadError: true,
      });
    }

    if (dirty && (hadSuccess || hadError)) {
      this.setState({
        hadSuccess: false,
        hadError: false,
      });
    }
  }

  handleFormSubmit(formValues) {
    const { id } = this.props.patient;
    return this.props.updatePatient(id, formValues);
  }

  renderBackButton() {
    return (
      <button
        className="back"
        type="button"
        onClick={() => this.props.history.push(urls.PATIENTS)}
      >
        <LeftArrow />
      </button>
    );
  }

  render() {
    const { handleSubmit, error, isAuth, patient, userType } = this.props;

    // change behavior based on userType
    const editable = userType === userTypes.PATIENT;
    const dataOnly = !editable ? 'data-only' : '';

    if (!isAuth || !patient) {
      return null;
    }

    const { firstName, lastName } = patient;

    return (
      <React.Fragment>
        <section className="heading">
          {!editable ? this.renderBackButton(editable) : null}
          <h1>{`Patient: ${firstName} ${lastName}`}</h1>
        </section>
        <section>
          <form
            className={`grid ${dataOnly}`}
            onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
          >
            <Field
              name="firstName"
              placeholder="First name"
              fieldClass="field-group"
              type="text"
              label="First name"
              disabled={!editable}
              validate={[val.required, val.minLength2]}
              component={InputField}
            />
            <Field
              name="lastName"
              placeholder="Last name"
              fieldClass="field-group"
              type="text"
              label="Last name"
              disabled={!editable}
              validate={[val.required, val.minLength2]}
              component={InputField}
            />
            <Field
              name="address"
              placeholder="Address"
              fieldClass="field-group"
              type="text"
              label="Address"
              disabled={!editable}
              validate={[val.required, val.minLength5]}
              component={InputField}
            />
            <Field
              name="city"
              placeholder="City"
              fieldClass="field-group"
              type="text"
              label="City"
              disabled={!editable}
              validate={[val.required, val.minLength2]}
              component={InputField}
            />
            <Field
              name="state"
              placeholder="State"
              fieldClass="field-group"
              type="text"
              label="State"
              disabled={!editable}
              validate={[val.required, val.minLength2]}
              component={InputField}
            />
            <Field
              name="email"
              placeholder="Email"
              fieldClass="field-group"
              type="text"
              label="Email"
              disabled={!editable}
              validate={[val.required, val.minLength5]}
              component={InputField}
            />
            <Field
              name="phoneNumber"
              placeholder="Phone number"
              fieldClass="field-group"
              type="text"
              label="Phone number"
              disabled={!editable}
              validate={[val.required, val.minLength5]}
              component={InputField}
            />
            {editable && (
              <div className="full">
                <button className="btn dark" type="submit">
                  Save
                </button>
                {this.state.hadError && error && (
                  <div className="msg error">{error}</div>
                )}
                {this.state.hadSuccess && (
                  <div className="msg success">
                    Your information has been updated.
                  </div>
                )}
              </div>
            )}
          </form>
        </section>
      </React.Fragment>
    );
  }
}

function accountSelector(patient) {
  if (!patient) {
    return {};
  }
  return {
    firstName: patient.firstName,
    lastName: patient.lastName,
    address: patient.address,
    city: patient.city,
    state: patient.state,
    email: patient.email,
    phoneNumber: patient.phoneNumber,
  };
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuth,
    userType: state.auth.userType,
    id: state.auth.id,
    patient: state.patients.patient,
    initialValues: accountSelector(state.patients.patient),
  };
}

Patient = reduxForm({
  form: 'patient',
  enableReinitialize: true,
})(Patient);

Patient = connect(
  mapStateToProps,
  actions,
)(Patient);

export default Patient;
