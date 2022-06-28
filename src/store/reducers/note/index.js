import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';

import ApiServiceClass from '../../../services/ApiService';

import JsonHelper from '../../../utils/JsonHelper';

// other store
import { setDrawerTypes } from '../layout';

const ApiService = new ApiServiceClass();

export const noteSlice = createSlice({
  name: 'note',
  initialState: {
    list: null,
    pagination: null,
    detail: null,
    noteTypes: null,
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
    setNoteTypes: (state, { type, payload }) => {
      state.noteTypes = payload;
    },
  },
});

export const { setList, setDetail, setPagination, setNoteTypes } =
  noteSlice.actions;

export const fetchNoteTypes = createAsyncThunk(
  'note/fetchTypes',
  async (payload, thunkApi) => {
    thunkApi.dispatch(setNoteTypes(null));

    const { data } = await ApiService.get({
      url: 'note/type',
    });

    thunkApi.dispatch(setDrawerTypes(data.data));
    thunkApi.dispatch(setNoteTypes(data.data));
    return data.data;
  }
);

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

    return data;
  }
);

export const fetchNoteDetail = createAsyncThunk(
  'note/fetchDetail',
  async (payload, thunkApi) => {
    const { id } = payload;

    // 先清掉
    thunkApi.dispatch(setDetail(null));

    const { data } = await ApiService.get({
      url: `note/${id}`,
    });

    thunkApi.dispatch(setDetail(data.data));

    return data.data;
  }
);

export const createNote = createAsyncThunk(
  'note/createNote',
  async (payload, thunkApi) => {
    const { data } = await ApiService.post({
      url: 'note/',
      data: payload,
    });

    return data.data;
  }
);

export const updateNote = createAsyncThunk(
  'note/updateNote',
  async (payload, thunkApi) => {
    console.log('updateNote payload => ', payload);

    const { data } = await ApiService.put({
      url: `note/${payload.id}`,
      data: { ..._.omit(payload, ['id']) },
    });

    const store = thunkApi.getState();
    const currentList = [...store.note.list];
    const newList = currentList.map((note) => {
      if (note.id === payload.id) {
        return payload;
      }
      return note;
    });

    thunkApi.dispatch(setList(newList));

    return data.data;
  }
);

export default noteSlice.reducer;
