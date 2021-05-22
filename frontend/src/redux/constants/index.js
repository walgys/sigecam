import { createSlice } from '@reduxjs/toolkit';

export const constants = createSlice({
  name: 'colors',
  initialState: {
    colors: {
      blue: 'blue',
      green: 'green',
      red: 'red',
      black: 'black',
      darkViolet: 'darkViolet',
      lightViolet: 'lightViolet',
    },
    accessByUserType: {
      1: {},
      2: {},
      3: {},
    },
  },
  reducers: {},
});

export default constants.reducer;
