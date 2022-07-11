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
    categories: null,
    category: null,
  },
  reducers: {
    setCategories: (state, { type, payload }) => {
      state.categories = payload;
    },
    setCategory: (state, { type, payload }) => {
      state.category = payload;
    },
  },
});

export const { setCategories, setCategory } = categorySlice.actions;

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (payload, thunkApi) => {
    thunkApi.dispatch(setDrawerCategories(null));

    const { data } = await ApiService.get({
      url: 'category/list',
    });

    thunkApi.dispatch(setDrawerCategories(data.data));
    thunkApi.dispatch(setCategories(data.data));
    return data.data;
  }
);

export const fetchCategory = createAsyncThunk(
  'category/fetchCategory',
  async (payload, thunkApi) => {
    const { id } = payload;

    thunkApi.dispatch(setCategory(null));

    const { data } = await ApiService.get({
      url: `category/${id}`,
    });

    thunkApi.dispatch(setCategory(data.data));

    return data.data;
  }
);

export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (payload, thunkApi) => {
    const { data } = await ApiService.post({
      url: 'category/',
      data: payload,
    });

    const store = thunkApi.getState();
    const currentList = _.cloneDeep(store.category.categories);

    setCategories([...currentList, data.data]);
    thunkApi.dispatch(setDrawerCategories([...currentList, data.data]));
    return data.data;
  }
);

export default categorySlice.reducer;
