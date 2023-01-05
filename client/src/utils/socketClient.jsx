import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { socketState } from '../features/socket/socket';
import { likePost } from '../features/posts/postActions'
import io from 'socket.io-client';
import { likeComment } from '../features/posts/commentActions';
import { createNotification } from '../features/notifications/notificationsActions';
import { createMessage } from '../features/messages/messagesActions';
import { addFriendsOnline, removeFriendsOnline } from '../features/onlineFriends/onlineFriendsSlice';
import { updateFriendsList } from '../features/users/usersActions';

export const SocketClient = () => {

  const { socket } = useSelector(state => state.socket);
  const { userInfo } = useSelector(state => state.auth);
  const { onlineFriends } = useSelector(state => state.onlineFriends);

  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io();
    dispatch(socketState(socket))
    return () => socket.close()
  },[dispatch])

  useEffect(() => {
    if(socket.connect) {
      socket.emit('joinUser', {id: userInfo._id, friends: userInfo.friends});
    }
  }, [socket, userInfo._id, userInfo.friends])

  useEffect(() => {
    if(socket.connect) {
      socket.on('likeToClient', id => {
        dispatch(likePost({id}))
      })
      return () => socket.off('likeToClient')
    }
  },[socket, dispatch])
  
  useEffect(() => {
    if(socket.connect) {
      socket.on('addMessageToClient', message => {
        dispatch(createMessage(message))
      })
      return () => socket.off('addMessageToClient')
    }
  },[socket, dispatch])

  useEffect(() => {
    if(socket.connect) {
      socket.on('likeToComment', id => {
        dispatch(likeComment({id}))
      })
      return () => socket.off('likeToComment')
    }
  },[socket, dispatch])

  useEffect(() => {
    if(socket.connect) {
      socket.on('createNotifyToClient', id => {
        dispatch(createNotification(id)) 
      })
      return () => socket.off('createNotifyToClient')
    }
  },[socket, dispatch])

  useEffect(() => {
    if(socket.connect) {
      socket.emit('checkOnlineUser', userInfo.friends) 
    }
  },[socket, dispatch, userInfo.friends])

  useEffect(() => {
    if(socket.connect) {
      socket.on('checkOnlineUserToMe', data => {
        data.forEach(e => {  
          if(!onlineFriends.includes(e.id)) {   
            dispatch(addFriendsOnline(e.id)) 
          }
        });
      })
      return () => socket.off('checkOnlineUserToMe')
    }
  },[socket, dispatch, onlineFriends])

  useEffect(() => {    
    if(socket.connect) {
      socket.on('CheckUserOffline', id =>{
        dispatch(removeFriendsOnline(id))
      })   
      return () => socket.off('CheckUserOffline')
    }
  },[socket, dispatch])

  useEffect(() => {    
    if(socket.connect) {
      socket.on('addFriendClient', userId =>{        
        dispatch(updateFriendsList({userId}))
      })   
      return () => socket.off('addFriendClient')
    }
  },[socket, dispatch])
  
  return(
    <></>
  )  
}