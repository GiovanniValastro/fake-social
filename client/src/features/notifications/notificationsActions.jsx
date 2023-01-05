import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';

export const getNotifications = createAsyncThunk(
  'notifications/getNotifications',
  async() => {
    try{
      const { data } = await api.fetchNotifications()
      return data
    }catch(error){
      console.log(error)
    }
  }
)

export const createNotification = createAsyncThunk(
  'notification/createNotifications',
  async(notification) => {
    try{
      if('sender' in notification) return notification;
      const { socket, ...notify } = notification;
      const { data } = await api.createNotification(notify)
      socket.emit('createNotify', data)
      return data
    }catch(error){
      console.log(error)
    } 
  } 
)

export const updateNotification = createAsyncThunk(
  'Notification/updateNotification',
  async(id) => {
    try{
      const { data } = await api.updateNotification(id)
      return data
    }catch(error){
      console.log(error)
    } 
  }  
)

export const deleteNotification = createAsyncThunk(
  'notification/deleteNotification',
  async(id) => {
    try{
      const { data } = await api.deleteNotification(id)
      return data
    }catch(error){
      console.log(error)
    } 
  }  
)

export const deleteAllNotifications = createAsyncThunk(
  'notifications/deleteAllNotifications',
  async() => {
    try{
      const { data } = await api.deleteAllNotifications()
      return data
    }catch(error){
      console.log(error)
    } 
  }  
)