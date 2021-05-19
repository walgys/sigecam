import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';

import userAPI from './userAPI';

const userEntity = new schema.Entity('user');

export const validateUser = createAsyncThunk(
  'user/validateUser',
  async (userName, password) => {
    const response = await userAPI.fetchUser(userName, password);
    // Normalize the data before passing it to our reducer
    const normalized = normalize(response.data, [userEntity]);
    return normalized.entities;
  }
);

export const slice = createSlice({
  name: 'users',
  initialState: {
    ids: [],
    entities: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(validateUser.fulfilled, (state, action) => {
      state.entities = action.payload.user;
      state.ids = Object.keys(action.payload.user);
    });
  },
});
