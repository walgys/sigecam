import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ControlApiBackend from 'services/controlApiBackend';
import { setSnack, setOpenSnack } from 'redux/variables';
import { onTokenExpired } from 'redux/user';

const controlApiBackend = new ControlApiBackend();

export const getDatosFormularios = createAsyncThunk(
  'recursosPaciente/getFormOptions',
  async (payload, thunkAPI) => {
    const result = await controlApiBackend.getDatosFormularios();
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
    altaPaciente: altaPacienteInitialState,
  },
  reducers: {},
  extraReducers: {
    [getDatosFormularios.fulfilled]: (state, { payload }) => {
      state.formOptions.provincias = payload?.provincias;
    },
  },
});

export const { onAltaChange } = recursosPacienteSlice.actions;
export default recursosPacienteSlice.reducer;
