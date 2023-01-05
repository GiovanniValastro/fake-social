import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { UploadImage } from '../../utils/UploadImage';

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async() => {
    try{
      const { data } = await api.fetchUsers()
      return data
    }catch(error){
      console.log(error)
    } 
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async(id) => {
    try{
      const { data } = await api.fetchUser(id)
      return data
    }catch(error){
      console.log(error)
    }
  } 
);

export const updateUser = createAsyncThunk(
  'User/updateUser',
  async({id, user}) => {
    let media;
    try{    
      const { avatar } = user
      if(avatar) media = await UploadImage([avatar])
      const { data } = await api.updateUser({id, user: {...user, avatar: avatar ? media[0].url : JSON.parse(localStorage.getItem('auth')).avatar}})
      return data
    }catch(error){
      console.log(error)
    } 
  }
)

export const updateFriendsList = createAsyncThunk(
  'auth/updateAuth',
  async({userId, socket}) => {
    try{      
      if(typeof userId !== 'string') return userId;
      const { data } = await api.updateFriendsList(userId)
      const storage = JSON.parse(localStorage.getItem('auth')).result;
      localStorage.setItem('auth', JSON.stringify({ result: {...storage, friends: data.friends}}));
      const { avatar, username, _id } = data;
      if(socket) {
      socket.emit('addFriend', {avatar, username, _id, userId})
    }
      return data
    }catch(error){
      console.log(error)
    } 
  }
)

export const deleteUser = createAsyncThunk(
  'User/deleteUser',
  async(id) => {
    try{
      const { data } = await api.deleteUser(id)
      return data
    }catch(error){
      console.log(error)
    } 
  }
)