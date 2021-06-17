import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import ControlApiBackend from 'services/controlApiBackend';
import { setSnack, setOpenSnack } from 'redux/variables';

const controlApiBackend = new ControlApiBackend();

export const autentificarUsuario = createAsyncThunk(
  'user/autentificarUsuario',
  async ({ userName, password }, thunkAPI) => {
    const result = await controlApiBackend.autentificarUsuario(
      userName,
      password
    );
    if (result.errorMessage !== null) {
      thunkAPI.dispatch(
        setSnack({ type: 'error', message: result.errorMessage })
      );
      thunkAPI.dispatch(setOpenSnack(true));
    }
    return result;
  }
);

export const validarSesion = createAsyncThunk(
  'user/validarSesion',
  async (payload, thunkAPI) => {
    const result = await controlApiBackend.validarSesion();
    if (result.errorMessage !== null) {
      thunkAPI.dispatch(
        setSnack({ type: 'error', message: result.errorMessage })
      );
      thunkAPI.dispatch(setOpenSnack(true));
    }
    return result;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuth: false,
    userData: {},
    sessionChecked: false,
    validateUserStatus: null,
    errorMessage: null,
  },
  reducers: {
    onTokenExpired: (state) => {
      state.isAuth = false;
    },
  },
  extraReducers: {
    [autentificarUsuario.fulfilled]: (state, { payload }) => {
      state.isAuth = payload?.isAuth;
      state.userData = payload?.data;
      state.errorMessage = payload?.errorMessage;
      state.status = 'success';
    },
    [validarSesion.fulfilled]: (state, { payload }) => {
      state.isAuth = payload.isAuth;
      state.userData = payload.data;
      state.errorMessage = payload.errorMessage;
      state.sessionChecked = true;
    },
  },
});

// Action creators are generated for each case reducer function

export default userSlice.reducer;
export const { onTokenExpired } = userSlice.actions;
