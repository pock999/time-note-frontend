import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import ApiService from '../../../services/ApiService';

import JsonHelper from '../../../utils/JsonHelper';

export const noteSlice = createSlice({
  name: 'note',
  initialState: {
    list: null,
    detail: null,
  },
  reducers: {
    setList: (state, { type, payload }) => {
      state.list = payload;
    },
    setDetail: (state, { type, payload }) => {
      state.detail = payload;
    },
  },
});

export const { setList, setDetail } = noteSlice.actions;

export const fetchNoteList = createAsyncThunk(
  'note/fetchList',
  async (payload, thunkApi) => {
    const { searchStr = null } = payload;

    // TODO: url query string and uri encode

    const { data } = await ApiService.get({
      url: `note/list${searchStr ? `?${searchStr}` : ''}`,
    });
  }
);

export default noteSlice.reducer;
