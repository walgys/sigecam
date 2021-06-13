import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import userAPI from './userAPI';
import { setSnack, setOpenSnack } from 'redux/variables';

export const validateUser = createAsyncThunk(
  'user/validateUser',
  async ({ userName, password }, thunkAPI) => {
    return await userAPI.validateUser(userName, password);
  }
);

export const validateSession = createAsyncThunk(
  'user/validateSession',
  async (payload, thunkAPI) => {
    const result = await userAPI.validateSession();
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
  reducers: {},
  extraReducers: {
    [validateUser.fulfilled]: (state, { payload }) => {
      state.isAuth = payload?.isAuth;
      state.userData = payload?.data;
      state.errorMessage = payload?.errorMessage;
      state.status = 'success';
    },
    [validateSession.fulfilled]: (state, { payload }) => {
      state.isAuth = payload.isAuth;
      state.userData = payload.data;
      state.errorMessage = payload.errorMessage;
      state.sessionChecked = true;
    },
  },
});

// Action creators are generated for each case reducer function

export default userSlice.reducer;
