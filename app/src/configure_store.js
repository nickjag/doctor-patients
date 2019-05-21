import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from './reducers';
import { saveState } from './localStorage';

const { logger } = require('redux-logger');

const middlewares = [];

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  middlewares.push(routerMiddleware(history)); // for dispatching history actions
  middlewares.push(reduxThunk);
  middlewares.push(logger);

  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    compose(applyMiddleware(...middlewares)),
  );

  store.subscribe(() => {
    saveState({
      auth: store.getState().auth,
    });
  });

  return store;
}
