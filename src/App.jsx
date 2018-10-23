import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { Navigation } from './navigation';
import { configureStore } from './redux/store';
import { rootSaga } from './redux/sagas';

export const store = configureStore();

store.store.runSaga(rootSaga);

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

export const App = hot(module)(() => (
  <Provider store={store.store}>
    <PersistGate loading={null} persistor={store.persistor}>
      <MuiThemeProvider theme={theme}>
        <Navigation />
      </MuiThemeProvider>
    </PersistGate>
  </Provider>
));
