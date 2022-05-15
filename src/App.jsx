import React from 'react';
import { Provider } from 'react-redux'

import PathRouter from './router';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <PathRouter />
    </Provider>
  );
};

export default App;