import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isShow: false,
  },
  reducers: {
    showLoading: (state) => {
      state.isShow = true;
    },
    hideLoading: (state) => {
      state.isShow = false;
    },
    setLoading: (state, { type, payload }) => {
      state.isShow = payload;
    },
  },
});

export const { showLoading, hideLoading, setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
