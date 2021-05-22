import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../user';
import constants from '../constants';

const store = configureStore({
  reducer: {
    user: userSlice,
    constants: constants,
  },
});

export default store;
