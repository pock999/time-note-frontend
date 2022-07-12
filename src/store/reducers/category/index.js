import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import dayjs from 'dayjs';

import ApiServiceClass from '../../../services/ApiService';

import JsonHelper from '../../../utils/JsonHelper';
import SwalHelper from '../../../utils/SwalHelper';

// other store
import { setDrawerTypes, setDrawerCategories } from '../layout';

const ApiService = new ApiServiceClass();

export const categorySlice = createSlice({
  name: 'category',
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

export const { setList, setDetail } = categorySlice.actions;

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (payload, thunkApi) => {
    thunkApi.dispatch(setDrawerCategories(null));

    const { data } = await ApiService.get({
      url: '/category/list',
    });

    thunkApi.dispatch(setDrawerCategories(data.data));
    thunkApi.dispatch(setList(data.data));
    return data.data;
  }
);

export const fetchCategory = createAsyncThunk(
  'category/fetchCategory',
  async (payload, thunkApi) => {
    const { id } = payload;

    thunkApi.dispatch(setDetail(null));

    const { data } = await ApiService.get({
      url: `/category/${id}`,
    });

    thunkApi.dispatch(setDetail(data.data));

    return data.data;
  }
);

export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (payload, thunkApi) => {
    const { data } = await ApiService.post({
      url: '/category/',
      data: payload,
    });

    const store = thunkApi.getState();
    const currentList = _.cloneDeep(store.category.list);

    thunkApi.dispatch(setList([...currentList, data.data]));
    thunkApi.dispatch(setDrawerCategories([...currentList, data.data]));
    return data.data;
  }
);

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async (payload, thunkApi) => {
    console.log('category/updateCategory payload => ', payload);
    const { data } = await ApiService.put({
      url: `/category/${payload.id}`,
      data: { ..._.omit(payload, ['id']) },
    });

    const store = thunkApi.getState();
    const currentList = _.cloneDeep(store.category.list);

    const newList = currentList.map((item) => {
      if (item.id === data.data.id) {
        return {
          ...item,
          ..._.pick(data.data, ['name', 'color']),
        };
      }
      return item;
    });

    thunkApi.dispatch(setList(newList));
    thunkApi.dispatch(setDrawerCategories(newList));
    return data.data;
  }
);

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (payload, thunkApi) => {
    const { data } = await ApiService.delete({
      url: `/category/${payload.id}`,
    });

    const store = thunkApi.getState();
    const currentList = _.cloneDeep(store.category.list);

    const newList = currentList.filter((item) => item.id !== payload.id);

    thunkApi.dispatch(setList(newList));
    thunkApi.dispatch(setDrawerCategories(newList));
    return data.data;
  }
);

export default categorySlice.reducer;
