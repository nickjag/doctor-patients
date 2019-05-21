import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Loader from './loader';

class LoaderRoot extends Component {
  componentDidMount() {
    this.loaderTarget = document.createElement('div');
    this.loaderTarget.className = 'loader';
    document.body.appendChild(this.loaderTarget);
    this.renderProvider();
  }

  componentWillUpdate() {
    this.renderProvider();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.loaderTarget);
    document.body.removeChild(this.loaderTarget);
  }

  renderProvider() {
    ReactDOM.render(
      <Provider store={this.props.store}>
        <Loader />
      </Provider>,
      this.loaderTarget,
    );
  }

  render() {
    return <noscript />;
  }
}

export default LoaderRoot;
