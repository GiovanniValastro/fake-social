import { createSlice } from '@reduxjs/toolkit';
import { getNotifications, updateNotification, deleteNotification, deleteAllNotifications, createNotification } from './notificationsActions';
import { toast } from 'react-toastify';

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: [],
    loading: null,
    error: null,
  },
  extraReducers: {
    [getNotifications.pending]: (state) => {
      state.loading = true  
    },
    [getNotifications.fulfilled]: (state, {payload}) => {
      state.loading = false
      state.notifications = payload
    },
    [getNotifications.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },

    [createNotification.fulfilled]: (state, {payload}) => {
      payload.type === 'friendshipRequest' && payload.sender._id === JSON.parse(localStorage.getItem('auth')).result._id &&
      toast.success('Friend request sent successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
      if(payload.sender._id !== JSON.parse(localStorage.getItem('auth')).result._id) {
        state.notifications = [...state.notifications, payload]  
        toast.success('New notification!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
      }
    },
    [updateNotification.rejected]: (state, {payload}) => {
      state.error = payload.message
    },

    [updateNotification.fulfilled]: (state) => {
      state.notifications = state.notifications.map(Notification => ( Notification.isRead === false ? { ...Notification, isRead : true } : Notification))
    },
    [updateNotification.rejected]: (state, {payload}) => {
      state.error = payload.message
    },

    [deleteNotification.fulfilled]: (state, {payload}) => {
      state.notifications = state.notifications.filter(Notification => Notification._id !== payload)
    },
    [deleteNotification.error]: (state, {payload}) => {
      state.error = payload.message
    },

    [deleteAllNotifications.fulfilled]: (state) => {
      state.notifications = []
    },
    [deleteAllNotifications.error]: (state, {payload}) => {
      state.error = payload.message
    }
  } 
});

export default NotificationSlice.reducer;