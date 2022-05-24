import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import 'sweetalert2/src/sweetalert2.scss';
import App from './src/App';

import 'regenerator-runtime/runtime';

import { Provider } from 'react-redux';
import store from './src/store';

// 用新版的，history會失效

// ReactDOM.render is no longer supported in React 18.
// Use createRoot instead.
// Until you switch to the new API, your app will behave as if it's running React 17

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

// const root = ReactDOMClient.createRoot(document.getElementById('app'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
