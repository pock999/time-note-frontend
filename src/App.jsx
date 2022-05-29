import React from 'react';
import './App.css';
import { Provider } from 'react-redux'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { zhTW } from '@mui/material/locale';

import PathRouter from './router';
import store from './store';

const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#90F3F1',
        light: 'c4ffff',
        dark: '#51A6A4',
        contrastText: '#000',
      },
      secondary: {
        main: '#F2DE77',
        light: '#ffffa8',
        dark: '#A6995A',
        contrastText: '#fff',
      },
      thirdColor: {
        light: '#ffd9ff',
        main: '#F2A7E0',
        dark: '#be77ae',
        contrastText: '#fff',
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        '微軟正黑體',
        'Arial',
        'sans-serif',
      ].join(','),
    },
  },
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