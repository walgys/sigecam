import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../user';
import constants from '../constants';
import formsSlice from 'redux/GestionPacientes/Forms';
import variablesSlice from 'redux/variables';

const store = configureStore({
  reducer: {
    constants: constants,
    variables: variablesSlice,
    user: userSlice,
    forms: formsSlice,
  },
});

export default store;
