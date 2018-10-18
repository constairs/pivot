import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './reducers';

export const history = createBrowserHistory();

export function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  /* eslint-disable */
  const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
  /* eslint-disable */

  const enhancer = composeEnhancers(
    applyMiddleware(routerMiddleware(history), sagaMiddleware),
  );
  const store = createStore(connectRouter(history)(rootReducer), enhancer);

  const persistor = persistStore(store);

  if (module.hot) {
    module.hot.accept('./reducers.js', () => {
      // eslint-disable-next-line
      const nextRootReducer = require('./reducers.js');
      store.replaceReducer(connectRouter(history)(nextRootReducer));
    });
  }
  store.runSaga = sagaMiddleware.run;
  return { store, persistor };
}
