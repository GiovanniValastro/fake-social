import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index'

export const createComment = createAsyncThunk(
  'comment/createtComment',
  async(comment) => {
    try{
      const { data } = await api.createComment(comment)
      return data
    }catch(error){
      console.log(error)
    } 
  } 
)

export const updateComment = createAsyncThunk(
  'comment/updateComment',
  async({ text, tags, id }) => {
    try{
      const { data } = await api.updateComment({ id, comment: { text, tags }})
      return data
    }catch(error){
      console.log(error)
    } 
  }
)

export const likeComment = createAsyncThunk(
  'comment/likeComment',
  async({id, socket}) => {
    try{
      if(typeof !id === 'string') return id
      const { data } = await api.likeComment(id)
      socket.emit('likeComment', data)
      return data
    }catch(error){
      console.log(error)
    } 
  }
)

export const deleteComment = createAsyncThunk(
  'comment/deleteComment',
  async(id) => {
    try{
      const { data } = await api.deleteComment(id)
      return data
    }catch(error){
      console.log(error)
    } 
  }
)