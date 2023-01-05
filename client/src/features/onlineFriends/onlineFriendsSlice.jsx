import { createSlice } from '@reduxjs/toolkit';

const onlineFriendsSlice = createSlice({
  name: 'onlineFriends',  
  initialState: {
    loading: false,
    onlineFriends: [],
    error: null, 
  },
  reducers: {
    addFriendsOnline: (state, {payload}) => {
      state.onlineFriends = [...state.onlineFriends, payload];
    },
    removeFriendsOnline: (state, {payload}) => {
      state.onlineFriends = state.onlineFriends.filter(item => item !== payload);
    }
  }    
})

export const { addFriendsOnline, removeFriendsOnline } = onlineFriendsSlice.actions;
export default onlineFriendsSlice.reducer;