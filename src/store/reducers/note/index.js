/* eslint-disable no-nested-ternary */
/* eslint-disable no-confusing-arrow */
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
        ..._.omit(payload, ['search', 'currentType', 'currentCategoryId']),
      },
    });

    const store = thunkApi.getState();
    const currentList = _.cloneDeep(store.note.list);

    const { currentType, currentCategoryId } = payload;

    // 若該表單之type, CategoryId與當前頁面的一樣，則放入redux內，使畫面更新
    if (
      ((_.isNil(payload.type) && _.isNil(currentType)) ||
        `${payload.type}` === currentType) &&
      ((_.isNil(payload.CategoryId) && _.isNil(currentCategoryId)) ||
        `${payload.CategoryId}` === currentCategoryId)
    ) {
      const newList = [data.data, ...currentList].sort((a, b) =>
        a.startAt > b.startAt ? -1 : a.startAt < b.startAt ? 1 : 1
      );
      thunkApi.dispatch(setList(newList));
    }

    console.log('data => ', data);

    return data.data;
  }
);

export const updateNote = createAsyncThunk(
  'note/updateNote',
  async (payload, thunkApi) => {
    console.log('updateNote payload => ', payload);

    const { data } = await ApiService.put({
      url: `/note/${payload.id}`,
      data: { ..._.omit(payload, ['id', 'currentType', 'currentCategoryId']) },
    });

    const store = thunkApi.getState();
    const currentList = _.cloneDeep(store.note.list);

    const { currentType, currentCategoryId } = payload;

    console.log('--------------------------------');
    console.log('payload => ', payload);

    const newList = currentList
      .map((item) => {
        console.log(`(item.id, data.data.id) => (${item.id}, ${data.data.id})`);
        if (item.id === data.data.id) {
          return {
            ...data.data,
          };
        }
        return item;
      })
      .sort((a, b) =>
        a.startAt > b.startAt ? -1 : a.startAt < b.startAt ? 1 : 1
      );
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

    const newList = currentList.filter((item) => item.id !== payload.id);

    thunkApi.dispatch(setList(newList));

    return data.data;
  }
);

export default noteSlice.reducer;
