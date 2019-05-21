import React from 'react';
import ReactDOM from 'react-dom';
import { loadState } from './localStorage';
import configureStore, { history } from './configure_store';
import configureApi from './api';
import Root from './components/root';
import './style/global.scss';

const persistedState = loadState();
const store = configureStore(persistedState);

configureApi(store);

ReactDOM.render(
  <Root store={store} history={history} />,
  document.querySelector('.wrapper'),
);
