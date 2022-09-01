import _ from 'lodash';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import ApiServiceClass from '../../../services/ApiService';

import JsonHelper from '../../../utils/JsonHelper';
import SwalHelper from '../../../utils/SwalHelper';

import history from '../../../libs/history';

const ApiService = new ApiServiceClass();

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authorization: null,
    user: null,
    roles: null,
    currentRole: null,
  },
  reducers: {
    setUser: (state, { type, payload }) => {
      state.user = payload;
    },
    setAuthorization: (state, { type, payload }) => {
      state.authorization = payload;
    },
    setRoles: (state, { type, payload }) => {
      state.roles = payload;
    },
    setCurrentRole: (state, { type, payload }) => {
      state.currentRole = payload;
    },
    clearAuth: (state) => {
      state.authorization = null;
      state.user = null;
      state.roles = null;
      state.currentRole = null;
    },
  },
});

export const {
  setUser,
  setAuthorization,
  setRoles,
  setCurrentRole,
  clearAuth,
} = authSlice.actions;

export const registerAction = createAsyncThunk(
  'auth/login',
  async (payload, thunkApi) => {
    try {
      const { data } = await ApiService.post({
        url: '/auth/register',
        data: payload,
      });

      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const activateAction = createAsyncThunk(
  'auth/activate',
  async (payload, thunkApi) => {
    try {
      const { data } = await ApiService.post({
        url: '/auth/activate',
        data: payload,
      });

      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const loginAction = createAsyncThunk(
  'auth/login',
  async (payload, thunkApi) => {
    try {
      const { data } = await ApiService.post({
        url: '/auth/login',
        data: payload,
      });

      thunkApi.dispatch(setUser(data.data.user));
      thunkApi.dispatch(setAuthorization(data.data.token));
      thunkApi.dispatch(setRoles(['IsUser']));
      thunkApi.dispatch(setCurrentRole('IsUser'));
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('roles', JsonHelper.JsonSerialize(['IsUser']));
      localStorage.setItem('currentRole', 'IsUser');
      localStorage.setItem('user', JsonHelper.JsonSerialize(data.data.user));
      ApiService.setToken(data.data.token);

      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const logoutAction = createAsyncThunk(
  'auth/login',
  async (payload, thunkApi) => {
    thunkApi.dispatch(clearAuth());
    localStorage.clear();
    ApiService.clearToken();

    SwalHelper.success('已登出');

    history.push('/login');
  }
);

export const getProfileAction = createAsyncThunk(
  'auth/profile',
  async (payload, thunkApi) => {
    try {
      const { data } = await ApiService.get({
        url: '/auth/profile',
      });

      localStorage.setItem('token', data.data.token);
      localStorage.setItem('roles', JsonHelper.JsonSerialize(['IsUser']));
      localStorage.setItem('currentRole', 'IsUser');
      localStorage.setItem('user', JsonHelper.JsonSerialize(data.data.user));

      ApiService.setToken(data.Authorization);

      thunkApi.dispatch(setAuthorization(data.data.token));
      thunkApi.dispatch(setUser(data.data.user));
      thunkApi.dispatch(setRoles(['IsUser']));
      thunkApi.dispatch(setCurrentRole('IsUser'));

      return {
        token: data.data.token,
        roles: ['IsUser'],
      };
    } catch (e) {
      console.log('e.response => ', e.response);

      if (e.response.status === 401) {
        thunkApi.dispatch(clearAuth());
        ApiService.clearToken();
        localStorage.clear();

        SwalHelper.fail('token 過期');

        history.push('/login');
      } else {
        await SwalHelper.fail(e.response.message);
        return null;
      }
    }
  }
);

export const updateProfileAction = createAsyncThunk(
  'auth/update-profile',
  async (payload, thunkApi) => {
    try {
      const { data } = await ApiService.put({
        url: '/auth/profile',
        data: payload,
      });
      thunkApi.dispatch(setUser(data.data));

      return data.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export default authSlice.reducer;
