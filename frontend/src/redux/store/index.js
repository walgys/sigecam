import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../user';
import constants from '../constants';
import formsSlice from 'redux/GestionPacientes/Forms';
import variablesSlice from 'redux/variables';
import recursosPacienteSlice from 'redux/GestionPacientes/RecursosPaciente';

const store = configureStore({
  reducer: {
    constants: constants,
    variables: variablesSlice,
    user: userSlice,
    forms: formsSlice,
    recursosPaciente: recursosPacienteSlice,
  },
});

export default store;
