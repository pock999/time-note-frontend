import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import 'sweetalert2/src/sweetalert2.scss';

import 'regenerator-runtime/runtime';

import { Provider } from 'react-redux';

import { Provider as StyletronProvider, DebugEngine } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { StyleReset } from 'atomize';
import store from './src/store';
import App from './src/App';

// 用新版的，history會失效

// ReactDOM.render is no longer supported in React 18.
// Use createRoot instead.
// Until you switch to the new API, your app will behave as if it's running React 17

// 1. Create a client engine instance
const engine = new Styletron();

const debug = process.env.NODE_ENV === 'production' ? 0 : new DebugEngine();

ReactDOM.render(
  <StyletronProvider value={engine} debug={debug} debugAfterHydration>
    <Provider store={store}>
      <StyleReset />
      <App />
    </Provider>
  </StyletronProvider>,
  document.getElementById('app')
);

// const root = ReactDOMClient.createRoot(document.getElementById('app'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
