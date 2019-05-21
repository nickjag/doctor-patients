import React from 'react';
import { Provider } from 'react-redux';
import App from './app';
import LoaderRoot from './loader/loader_root';

const Root = ({ store }) => (
  <React.Fragment>
    <Provider store={store}>
      <App />
    </Provider>
    <LoaderRoot store={store} />
  </React.Fragment>
);

export default Root;
