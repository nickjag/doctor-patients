import React, { Component } from 'react';
import { debounce } from 'lodash';

import Cancel from '../icons/cancel';

class PatientSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };

    this.fetchSearchResults = debounce(this.fetchSearchResults, 250);
    this.clearQuery = this.clearQuery.bind(this);
  }

  componentDidMount() {
    if (this.props.initQuery) {
      this.setState({
        query: this.props.initQuery,
      });
    }
  }

  onInputChange(query) {
    this.fetchSearchResults(query);
    this.setState({
      query,
    });
  }

  clearQuery() {
    this.onInputChange('');
  }

  fetchSearchResults(query) {
    this.props.handleSearch(query);
  }

  renderCancel() {
    return (
      <button className="cancel" type="button" onClick={this.clearQuery}>
        <Cancel />
      </button>
    );
  }

  render() {
    return (
      <form
        name="query"
        onSubmit={() => this.fetchSearchResults(this.state.query)}
      >
        <fieldset className="field-group full">
          <input
            value={this.state.query}
            onChange={e => this.onInputChange(e.target.value)}
            type="text"
            className="field-input"
            placeholder="Search by name or email..."
          />
          {this.state.query && this.renderCancel()}
        </fieldset>
      </form>
    );
  }
}

export default PatientSearch;
