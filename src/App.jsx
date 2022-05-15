import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import history from './libs/history';
import Router from './router';

const App = () => {
  return (
    <BrowserRouter history={history}>
      <Router />
    </BrowserRouter>
  );
};

export default App;