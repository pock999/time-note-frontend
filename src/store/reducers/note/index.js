import { createSlice, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
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
    pagination: {
      page: 1,
      totalCount: 0,
    },
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
      url: '/note/types',
    });

    thunkApi.dispatch(setDrawerTypes(data.data));
    thunkApi.dispatch(setNoteTypes(data.data));
    return data.data;
  }
);

export const fetchNoteList = createAsyncThunk(
  'note/fetchList',
  async (payload, thunkApi) => {
    try {
      const { searchAry = [] } = payload;

      const store = thunkApi.getState();
      const currentPagination = _.cloneDeep(store.note.pagination);

      if (currentPagination.page === 1) {
        thunkApi.dispatch(setList(null));
      }

      const currentList = _.cloneDeep(store.note.list);

      const searchStr = [...searchAry, `page=${currentPagination.page}`]
        .filter((str) => !!str)
        .join('&');

      const { data } = await ApiService.get({
        url: `/note/list${searchStr ? `?${searchStr}` : ''}`,
      });

      const newList = [
        ...(currentPagination.page === 1 ? [] : currentList),
        ...data.data,
      ];

      thunkApi.dispatch(setList(newList));
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
      url: `/note/${id}`,
    });

    thunkApi.dispatch(setDetail(data.data));

    return data.data;
  }
);

export const createNote = createAsyncThunk(
  'note/createNote',
  async (payload, thunkApi) => {
    const { data } = await ApiService.post({
      url: '/note/',
      data: {
        ..._.omit(payload, ['search']),
      },
    });

    const store = thunkApi.getState();
    const currentList = _.cloneDeep(store.note.list);

    const dataYear = data.data.startAt.slice(0, 4);
    const dataGroup = data.data.startAt.slice(0, 7);

    // 直接重call list api
    console.log('location.search => ', window.location.search);
    const resultAction = await thunkApi.dispatch(
      fetchNoteList({ searchAry: payload.search.split('?')[1].split('&') })
    );

    await unwrapResult(resultAction);

    return data.data;
  }
);

export const updateNote = createAsyncThunk(
  'note/updateNote',
  async (payload, thunkApi) => {
    console.log('updateNote payload => ', payload);

    const { data } = await ApiService.put({
      url: `/note/${payload.id}`,
      data: { ..._.omit(payload, ['id']) },
    });

    const store = thunkApi.getState();
    const currentList = _.cloneDeep(store.note.list);

    const categories = store.category.list;

    const newList = {};
    Object.keys(currentList).map((year) => {
      const temp = currentList[year].map((note) => {
        if (note.id === payload.id) {
          return {
            ...payload,
            Category: categories.find((item) => item.id === payload.CategoryId),
          };
        }
        return note;
      });
      newList[year] = temp.sort((a, b) => (a.startAt > b.startAt ? -1 : 1));
    });

    thunkApi.dispatch(setList(newList));

    return data.data;
  }
);

export const deleteNote = createAsyncThunk(
  'note/deleteNote',
  async (payload, thunkApi) => {
    const { data } = await ApiService.delete({
      url: `/note/${payload.id}`,
    });

    const store = thunkApi.getState();
    const currentList = _.cloneDeep(store.note.list);

    const newList = {};
    Object.keys(currentList).map((year) => {
      const temp = currentList[year].filter((note) => note.id !== payload.id);
      newList[year] = temp.sort((a, b) => (a.startAt > b.startAt ? -1 : 1));
    });

    thunkApi.dispatch(setList(newList));

    return data.data;
  }
);

export default noteSlice.reducer;
