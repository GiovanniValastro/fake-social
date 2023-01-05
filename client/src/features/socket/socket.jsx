import { createSlice } from "@reduxjs/toolkit";

export const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    socket: [],
    loading: null,
    error: null,
  }, 
  reducers: {
    socketState: (state, {payload}) => {
      state.socket = payload;
    }
  }  
})  

export const { socketState } = socketSlice.actions;
export default socketSlice.reducer;

