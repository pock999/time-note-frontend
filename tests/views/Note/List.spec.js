/**
 * @jest-environment jsdom
 */

import React from 'react';
import { Router } from 'react-router-dom';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import NoteList from '../../../src/views/Note/List';

import { createMemoryHistory } from 'history';

describe('=== Note/List.jsx ===', () => {
  it('- router note/list', () => {
    const history = createMemoryHistory({ initialEntries: ['/notes'] });

    const { getByText } = render(
      <Router history={history}>
        <NoteList />
      </Router>
    );
    expect(getByText('Note List')).toBeInTheDocument();
    expect(history.location.pathname).toBe('/notes');
  });
});
