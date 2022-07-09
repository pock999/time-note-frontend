import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import dayjs from 'dayjs';

import ApiServiceClass from '../../../services/ApiService';

import JsonHelper from '../../../utils/JsonHelper';
import SwalHelper from '../../../utils/SwalHelper';

// other store
import { setDrawerTypes, setDrawerCategories } from '../layout';

const ApiService = new ApiServiceClass();

export const noteSlice = createSlice({
  name: 'note',
  initialState: {
    list: null,
    pagination: null,
    detail: null,
    noteTypes: null,
    noteCategories: null,
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
    setNoteCategories: (state, { type, payload }) => {
      state.noteCategories = payload;
    },
  },
});

export const {
  setList,
  setDetail,
  setPagination,
  setNoteTypes,
  setNoteCategories,
} = noteSlice.actions;

export const fetchNoteTypes = createAsyncThunk(
  'note/fetchTypes',
  async (payload, thunkApi) => {
    thunkApi.dispatch(setNoteTypes(null));

    const { data } = await ApiService.get({
      url: 'note/types',
    });

    thunkApi.dispatch(setDrawerTypes(data.data));
    thunkApi.dispatch(setNoteTypes(data.data));
    return data.data;
  }
);

export const fetchNoteCategoies = createAsyncThunk(
  'note/fetchNoteCategoies',
  async (payload, thunkApi) => {
    thunkApi.dispatch(setNoteTypes(null));

    const { data } = await ApiService.get({
      url: 'note/categories',
    });

    thunkApi.dispatch(setDrawerCategories(data.data));
    thunkApi.dispatch(setNoteCategories(data.data));
    return data.data;
  }
);

export const fetchNoteList = createAsyncThunk(
  'note/fetchList',
  async (payload, thunkApi) => {
    try {
      const { searchAry = [] } = payload;

      // 先清掉
      thunkApi.dispatch(setList(null));
      thunkApi.dispatch(setPagination(null));

      const searchStr = searchAry.filter((str) => !!str).join('&');

      const { data } = await ApiService.get({
        url: `note/list${searchStr ? `?${searchStr}` : ''}`,
      });

      thunkApi.dispatch(setList(data.data.notes));
      thunkApi.dispatch(setPagination(data.paging));

      return data;
    } catch (e) {
      SwalHelper.fail(e.message);
      throw e;
    }
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

    const store = thunkApi.getState();
    const currentList = _.cloneDeep(store.note.list);

    const dataYear = data.data.startAt.slice(0, 4);
    const dataGroup = data.data.startAt.slice(0, 7);

    // 直接重call list api
    thunkApi.dispatch(
      fetchNoteList({ searchStr: window.location.search.split('?')[1] })
    );

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
    const currentList = _.cloneDeep(store.note.list);

    const newList = {};
    Object.keys(currentList).map((year) => {
      const temp = currentList[year].map((note) => {
        if (note.id === payload.id) {
          return payload;
        }
        return note;
      });
      newList[year] = temp.sort((a, b) => (a.startAt > b.startAt ? -1 : 1));
    });

    thunkApi.dispatch(setList(newList));

    return data.data;
  }
);

export default noteSlice.reducer;
