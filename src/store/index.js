import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';
import loadingSlice from './reducers/loading';

export default configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingSlice,
  },
  applyMiddleware: applyMiddleware(thunk),
});
