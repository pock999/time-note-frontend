/**
 * @jest-environment jsdom
 */

import React from 'react';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe('=== App.jsx ===', () => {
  beforeAll(() => {
    render(<App />)
  });

  it('渲染 App.jsx', () => {
    const message = 'App';

    expect(screen.getByText(message)).toBeInTheDocument()
  })

  afterAll(cleanup);
});