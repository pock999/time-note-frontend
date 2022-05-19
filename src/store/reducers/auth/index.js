import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import ApiService from '../../../services/ApiService';

import JsonHelper from '../../../utils/JsonHelper';

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

export const loginAction = createAsyncThunk(
  'auth/login',
  async (payload, thunkApi) => {
    const { data } = await ApiService.post({
      url: `auth/login`,
      data: payload,
    });

    thunkApi.dispatch(setUser(data.data.user));
    thunkApi.dispatch(setAuthorization(data.data.token));
    thunkApi.dispatch(setRoles(JsonHelper.JsonSerialize(['IsUser'])));
    thunkApi.dispatch(setCurrentRole('IsUser'));
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('user', JsonHelper.JsonSerialize(data.data.user));

    return data;
  }
);

export const logoutAction = createAsyncThunk(
  'auth/login',
  async (payload, thunkApi) => {
    thunkApi.dispatch(clearAuth());
    localStorage.clear();
  }
);

export default authSlice.reducer;
