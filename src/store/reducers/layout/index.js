import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';

import ApiServiceClass from '../../../services/ApiService';

import JsonHelper from '../../../utils/JsonHelper';

const ApiService = new ApiServiceClass();

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    // 抽屜上半部，note type
    drawerTypes: null,
    // 抽屜上半部，note category
    drawerCategories: null,
    // focus的note type
    focusDrawerType: null,
    // focus的note category
    focusDrawerCategory: null,
  },
  reducers: {
    setDrawerTypes: (state, { type, payload }) => {
      state.drawerTypes = payload;
    },
    setDrawerCategories: (state, { type, payload }) => {
      state.drawerCategories = payload;
    },
    setFocusDrawerType: (state, { type, payload }) => {
      state.focusDrawerType = payload;
    },
    setFocusCategory: (state, { type, payload }) => {
      state.focusCategory = payload;
    },
  },
});

export const {
  setDrawerTypes,
  setDrawerCategories,
  setFocusDrawerType,
  setFocusCategory,
} = layoutSlice.actions;

export default layoutSlice.reducer;
