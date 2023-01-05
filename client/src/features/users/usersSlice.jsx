import { createSlice } from '@reduxjs/toolkit';
import { getUsers, getUser, updateUser, deleteUser } from './usersActions';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: null,
    error: null,
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.loading = true  
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.users = payload
    },
    [getUsers.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },

    [getUser.pending]: (state) => {
      state.loading = true  
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.users = payload
    },
    [getUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },

    [updateUser.fulfilled]: (state, {payload}) => {
      state.users = payload
    },
    [updateUser.rejected]: (state, {payload}) => {
      state.error = payload.message
    },

    [deleteUser.fulfilled]: (state) => {
      state.users = null
    },
    [deleteUser.error]: (state, {payload}) => {
      state.error = payload.message
    }
  },
});

export default usersSlice.reducer;

