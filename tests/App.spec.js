/**
 * @jest-environment jsdom
 */

import React from 'react';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import App from '../src/App';

import { createMemoryHistory } from 'history';

describe('=== App.jsx ===', () => {
  describe('# 渲染 App.jsx', () => {
    it('- router home', () => {
      const history = createMemoryHistory({ initialEntries: ['/'] });
      expect(history.location.pathname).toBe('/');
    });
  });
});
