import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../user';
import constants from '../constants';
import formsSlice from 'redux/Forms';

const store = configureStore({
  reducer: {
    user: userSlice,
    constants: constants,
    forms: formsSlice,
  },
});

export default store;
