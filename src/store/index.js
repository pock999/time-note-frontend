import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';
import noteReducer from './reducers/note';
import loadingSlice from './reducers/loading';

export default configureStore({
  reducer: {
    auth: authReducer,
    note: noteReducer,
    loading: loadingSlice,
  },
  applyMiddleware: applyMiddleware(thunk),
});
