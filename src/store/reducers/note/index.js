import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import ApiServiceClass from '../../../services/ApiService';

import JsonHelper from '../../../utils/JsonHelper';

const ApiService = new ApiServiceClass();

export const noteSlice = createSlice({
  name: 'note',
  initialState: {
    list: null,
    pagination: null,
    detail: null,
  },
  reducers: {
    setList: (state, { type, payload }) => {
      state.list = payload;
    },
    setPagination: (state, { type, payload }) => {
      state.pagination = payload;
    },
    setDetail: (state, { type, payload }) => {
      state.detail = payload;
    },
  },
});

export const { setList, setDetail, setPagination } = noteSlice.actions;

export const fetchNoteList = createAsyncThunk(
  'note/fetchList',
  async (payload, thunkApi) => {
    const { searchStr = null } = payload;

    // 先清掉
    thunkApi.dispatch(setList(null));
    thunkApi.dispatch(setPagination(null));

    const { data } = await ApiService.get({
      url: `note/list${searchStr ? `?${searchStr}` : ''}`,
    });

    thunkApi.dispatch(setList(data.data));
    thunkApi.dispatch(setPagination(data.paging));
  }
);

export default noteSlice.reducer;
