/**
 * @jest-environment jsdom
 */

import React from 'react';
import { Router } from 'react-router-dom';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import Login from '../../src/views/Login';

import { createMemoryHistory } from 'history';

import { Provider } from 'react-redux';
import store from '../../src/store';

describe('=== Login.jsx ===', () => {
  it('- router login', () => {
    const history = createMemoryHistory({ initialEntries: ['/login'] });

    const { getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>
    );
    expect(getByText('登入頁')).toBeInTheDocument();
    expect(history.location.pathname).toBe('/login');
  });
});
