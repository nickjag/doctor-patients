import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Logout extends Component {
  componentDidMount() {
    this.props.logoutUser();
  }

  render() {
    return null;
  }
}

export default connect(
  null,
  actions,
)(Logout);
