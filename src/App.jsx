import React from 'react';
import { Provider } from 'react-redux'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { zhTW } from '@mui/material/locale';

import PathRouter from './router';
import store from './store';

const theme = createTheme(
  {},
  zhTW,
);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PathRouter />
      </Provider>
    </ThemeProvider>
  );
};

export default App;