import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/auth';
import loadingSlice from './reducers/loading';

export default configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingSlice,
  },
});