/**
 * @jest-environment jsdom
 */

import React from 'react';
import { Router } from 'react-router-dom';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import Home from '../../src/views/Home';

import { createMemoryHistory } from 'history';

describe('=== Home.jsx ===', () => {
  it('- router home', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });

    const { getByText } = render(
      <Router history={history}>
        <Home />
      </Router>
    );
    expect(getByText('Time-Note')).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });
});
