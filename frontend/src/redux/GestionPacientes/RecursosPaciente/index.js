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

export const recursosPacienteSlice = createSlice({
  name: 'recursosPaciente',
  initialState: {
    pacientes: [],
    selectedPaciente: 0,
  },
  reducers: {
    onSelectPaciente: (state, { payload }) => {
      state.selectedPaciente = payload.selectedPaciente;
    },
  },
  extraReducers: {
    [getListaPacientes.fulfilled]: (state, { payload }) => {
      state.pacientes = payload?.pacientes;
    },
  },
});

export const { onSelectPaciente } = recursosPacienteSlice.actions;
export default recursosPacienteSlice.reducer;
