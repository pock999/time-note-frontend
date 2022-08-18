import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';
import noteReducer from './reducers/note';
import loadingSlice from './reducers/loading';
import layoutSlice from './reducers/layout';
import categorySlice from './reducers/category';

export default configureStore({
  reducer: {
    auth: authReducer,
    note: noteReducer,
    loading: loadingSlice,
    layout: layoutSlice,
    category: categorySlice,
  },
  applyMiddleware: applyMiddleware(thunk),
});
