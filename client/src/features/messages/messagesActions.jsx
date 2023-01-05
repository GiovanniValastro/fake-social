import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { UploadImage } from '../../utils/UploadImage';

export const getMessages = createAsyncThunk(
  'messages/getMessages',
  async({recipient}) => {
    try{
      const { data } = await api.fetchMessages(recipient)
      return data
    }catch(error){
      console.log(error)
    }
  }
)

export const createMessage = createAsyncThunk(
  'message/createMessage',
  async(message) => {
    try{
      if('sender' in message) return message;
      let media = [];
      const { images } = message;
      if(images.length > 0) media = await UploadImage(images);
      const { socket, ...newMessage } = message;
      const { data } = await api.createMessages({ ...newMessage, images: media, });
      socket.emit('addMessage', data);
      return data
    }catch(error){
      console.log(error);
    } 
  } 
)

export const deleteMessage = createAsyncThunk(
  'message/deleteMessage',
  async(id) => {
    try{
      const { data } = await api.deleteMessages(id)
      return data
    }catch(error){
      console.log(error)
    } 
  }  
)