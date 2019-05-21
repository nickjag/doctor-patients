import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as urls from '../../constants/urls';
import * as userTypes from '../../constants/user_types';
import * as actions from '../../actions';

export default function(ComposedComponent) {
  class NoAuth extends Component {
    componentDidMount() {
      if (this.props.isAuth) {
        this.handleAuthenticated();
      }
    }

    componentDidUpdate() {
      if (this.props.isAuth) {
        this.handleAuthenticated();
      }
    }

    handleAuthenticated() {
      let redirect;

      switch (this.props.userType) {
        case userTypes.PATIENT:
          redirect = `${urls.PATIENT}/${this.props.username}`;
          break;
        case userTypes.DOCTOR:
          redirect = urls.PATIENTS;
          break;
        default:
          redirect = urls.LOGOUT;
      }
      this.props.history.push(redirect);
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      id: state.auth.id,
      isAuth: state.auth.isAuth,
      userType: state.auth.userType,
      username: state.auth.username,
    };
  }

  return connect(
    mapStateToProps,
    actions,
  )(NoAuth);
}
