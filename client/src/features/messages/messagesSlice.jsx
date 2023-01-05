import { createSlice } from '@reduxjs/toolkit';
import { getMessages, createMessage, deleteMessage } from './messagesActions';

export const MessageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [],
    loading: null,
    error: null,
  },
  extraReducers: {
    [getMessages.pending]: (state) => {
      state.loading = true  
    },
    [getMessages.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.messages = payload
    },
    [getMessages.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },

    [createMessage.fulfilled]: (state, { payload }) => {
        state.messages = [...state.messages, payload]  
    },
    [createMessage.rejected]: (state, { payload }) => {
      state.error = payload.message
    },

    [deleteMessage.fulfilled]: (state, { payload }) => {
      state.messages = state.messages.filter(message => message._id !== payload)
    },
    [deleteMessage.error]: (state, {payload}) => {
      state.error = payload.message
    }
  },
});

export default MessageSlice.reducer;

