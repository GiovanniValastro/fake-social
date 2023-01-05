import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import postsReducer from './posts/postSlice';
import usersReducer from './users/usersSlice';
import notificationReducer from './notifications/notificationsSlice';
import messagesReducer from './messages/messagesSlice';
import socketReducer from './socket/socket';
import themeReducer from './theme/themeSlice';
import onlineFriendsReducer from './onlineFriends/onlineFriendsSlice';

export const store = configureStore({
  reducer:{
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer,
    notification: notificationReducer,
    messages: messagesReducer,
    socket: socketReducer,
    theme: themeReducer,
    onlineFriends: onlineFriendsReducer
  },
});
