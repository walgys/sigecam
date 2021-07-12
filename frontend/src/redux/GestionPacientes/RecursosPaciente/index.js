import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ControlApiBackend from 'services/controlApiBackend';
import { setSnack, setOpenSnack } from 'redux/variables';
import { onTokenExpired } from 'redux/user';

const controlApiBackend = new ControlApiBackend();

export const getListaPacientes = createAsyncThunk(
  'recursosPaciente/getListaPacientes',
  async (payload, thunkAPI) => {
    const result = await controlApiBackend.getListaPacientes(payload);

    if (result.errorMessage !== null) {
      thunkAPI.dispatch(
        setSnack({ type: 'error', message: result.errorMessage })
      );
      thunkAPI.dispatch(setOpenSnack(true));
      if (result.error === 'INVALID_TOKEN') thunkAPI.dispatch(onTokenExpired());
    }
    return result;
  }
);

export const getRecursosPaciente = createAsyncThunk(
  'recursosPaciente/getRecursosPaciente',
  async (payload, thunkAPI) => {
    const result = await controlApiBackend.getRecursosPaciente(payload);

    if (result.errorMessage !== null) {
      thunkAPI.dispatch(
        setSnack({ type: 'error', message: result.errorMessage })
      );
      thunkAPI.dispatch(setOpenSnack(true));
      if (result.error === 'INVALID_TOKEN') thunkAPI.dispatch(onTokenExpired());
    }
    return result;
  }
);

export const recursosPacienteSlice = createSlice({
  name: 'recursosPaciente',
  initialState: {
    pacientes: [],
    tiposRecurso: [],
    ubicacionesInstitucion: [],
    selectedPaciente: {
      id: 0,
      recursos: [],
    },
  },
  reducers: {
    onSelectPaciente: (state, { payload }) => {
      state.selectedPaciente.id = payload;
    },
  },
  extraReducers: {
    [getListaPacientes.fulfilled]: (state, { payload }) => {
      state.pacientes = payload?.pacientes;
    },
    [getRecursosPaciente.fulfilled]: (state, { payload }) => {
      state.selectedPaciente = {
        ...state.selectedPaciente,
        recursos: payload?.recursosPaciente,
      };
      state.tiposRecurso = payload?.tiposRecurso;
      state.ubicacionesInstitucion = payload?.ubicacionesInstitucion;
    },
  },
});

export const { onSelectPaciente } = recursosPacienteSlice.actions;
export default recursosPacienteSlice.reducer;
