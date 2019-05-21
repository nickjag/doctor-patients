import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as urls from '../../constants/urls';

export default function(ComposedComponent) {
  class Authentication extends Component {
    constructor(props) {
      super(props);

      this.state = {
        checked: false,
      };
    }

    componentDidMount() {
      if (!this.props.isAuth) {
        this.notAuthenticated();
        return;
      }

      this.setState({ checked: true });
    }

    componentDidUpdate() {
      if (!this.props.isAuth) {
        this.props.history.push(urls.LOGIN);
      }
    }

    notAuthenticated() {
      this.props.history.push(urls.LOGIN);
    }

    render() {
      if (!this.state.checked) {
        return null;
      }

      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      isAuth: state.auth.isAuth,
    };
  }

  return connect(mapStateToProps)(Authentication);
}
