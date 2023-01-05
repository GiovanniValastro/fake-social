import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index'

export const signUp = createAsyncThunk(
  'auth/signUp',
  async(endpoint) => {
    try{
      const { data } = await api.signUp(endpoint)
      localStorage.setItem('auth', JSON.stringify(data))
      return data
    }catch(error){
      return error
    }
  }
)

export const signIn = createAsyncThunk(
  'auth/signIn',
  async(endpoint) => {
    try {
      const { data } = await api.signIn(endpoint)
      localStorage.setItem('auth', JSON.stringify(data))
      return data
    }catch(error) {
      return error
    }
  } 
)
