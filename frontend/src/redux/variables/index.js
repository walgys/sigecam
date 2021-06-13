import { createSlice } from '@reduxjs/toolkit';

export const variablesSlice = createSlice({
  name: 'variables',
  initialState: {
    snack: { type: 'error', message: '' },
    openSnack: false,
  },
  reducers: {
    setSnack: (state, { payload }) => {
      if (typeof payload?.message !== 'undefined')
        state.snack.message = payload?.message;

      if (typeof payload?.type !== 'undefined')
        state.snack.type = payload?.type;
    },
    setOpenSnack: (state, { payload }) => {
      state.openSnack = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSnack, setOpenSnack } = variablesSlice.actions;
export default variablesSlice.reducer;
