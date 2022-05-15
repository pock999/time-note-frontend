/**
 * @jest-environment jsdom
 */

import React from 'react';
import { Router } from 'react-router-dom';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import Login from '../../src/views/Login';

import { createMemoryHistory } from 'history';

describe('=== Login.jsx ===', () => {
  it('- router login', () => {
    const history = createMemoryHistory({ initialEntries: ['/login'] });

    const { getByText } = render(
      <Router history={history}>
        <Login />
      </Router>
    );
    expect(getByText('登入頁')).toBeInTheDocument();
    expect(history.location.pathname).toBe('/login');
  });
});
