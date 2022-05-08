import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authorization: null,
    user: null,
    roles: null,
    currentRole: null,
  },
  reducers: {
    setUser: (state, payload) => {
      state.user = payload;
    },
    setAuthorization: (state, payload) => {
      state.authorization = payload;
    },
    setRoles: (state, payload) => {
      state.roles = payload;
    },
    setCurrentRole: (state, payload) => {
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
  setUser, setAuthorization, setRoles, setCurrentRole, clearAuth,
} = authSlice.actions;


export const login = (payload) => (dispatch) => {

};

export const logout = () => (dispatch) => {
  dispatch(clearAuthI());
};

export default authSlice.reducer;