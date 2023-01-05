import { createSlice } from '@reduxjs/toolkit';
import { signUp, signIn } from './authActions';
import { updateFriendsList } from '../users/usersActions';
import { toast } from 'react-toastify';

const userInfo = localStorage.getItem('auth') ?
  JSON.parse(localStorage.getItem('auth')).result :
  null
  
const initialState = {
  loading: false,
  userInfo,
  err: null,
}

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      localStorage.removeItem('auth')
      state.loading = false
      state.userInfo = null
      state.err = null
    }
  },
  extraReducers: {
    [signUp.pending]: (state) => {
      state.loading = true
      state.err = null
    },
    [signUp.fulfilled]: (state, {payload}) => {
      state.loading = false
      state.userInfo = payload.result
      toast.success("Logged in Successfully.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    },
    [signUp.rejected]: (state, {payload}) => {
      state.loading = false
      state.err = payload 
    },

    [signIn.pending]: (state) => {
      state.loading = true
      state.err = null
    },
    [signIn.fulfilled]: (state, {payload}) => {
      state.loading = false
      state.userInfo = payload.result
      if(payload.result){
        toast.success('Logged in Successfully.', {
        position: toast.POSITION.BOTTOM_RIGHT,
      })}else{   
        state.err = true
      }
    },
    [signIn.rejected]: (state, {payload}) => {
      state.loading = false
      state.err = payload
    },

    [updateFriendsList.fulfilled]: (state, {payload}) => {
      if(payload.email) {
        state.userInfo = payload
      }else{
        state.userInfo = { ...state.userInfo, friends:[ ...state.userInfo.friends, payload]  }
        const storage = JSON.parse(localStorage.getItem('auth')).result;
        localStorage.setItem('auth', JSON.stringify({ result: {...storage, friends: [...storage.friends, payload]}}));
      }
      
    },
    [updateFriendsList.rejected]: (state, {payload}) => {
      state.userInfo = payload.message
    },

  }  
})

export const { logout, filterMyFriends } = authSlice.actions
export default authSlice.reducer