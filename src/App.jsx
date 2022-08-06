import React from 'react';
import './App.css';
import { Provider, useDispatch } from 'react-redux';

import PathRouter from './router';
import store from './store';

import { AppLoading } from './components';

import { showLoading, hideLoading } from './store/reducers/loading';

function App() {
  const dispatch = useDispatch();
  React.useLayoutEffect(() => {
    dispatch(showLoading());
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(hideLoading());
    }, 1000);
  }, []);

  return (
    <Provider store={store}>
      <PathRouter />
      <AppLoading />
    </Provider>
  );
}

export default App;
