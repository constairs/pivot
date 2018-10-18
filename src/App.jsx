import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { injectGlobal } from 'styled-components';

import { Navigation } from './navigation';
import { configureStore } from './redux/store';
import { rootSaga } from './redux/sagas';
import { globalStyles } from './theme/globalStyles';

export const store = configureStore();

store.store.runSaga(rootSaga);

/* eslint-disable */
injectGlobal`${globalStyles}`;
/* eslint-disable */

export const App = hot(module)(() => (
  <Provider store={store.store}>
    <PersistGate loading={null} persistor={store.persistor}>
      <Navigation />
    </PersistGate>
  </Provider>
));
