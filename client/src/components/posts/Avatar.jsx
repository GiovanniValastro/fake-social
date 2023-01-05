import React, { useState } from 'react';
import { Avatar, Button, Menu, Typography, Box, Stack } from '@mui/material';
import { PersonAdd, PersonRemove, Send } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { createNotification } from '../../features/notifications/notificationsActions';
import { updateFriendsList } from '../../features/users/usersActions';
import { Link } from 'react-router-dom';

export const AvatarUser = ({creator}) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const { userInfo } = useSelector(state => state.auth);
  const { socket } = useSelector(state => state.socket);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleFriendship = () => {
    if(creator?.friends.includes(userInfo?._id)) {
      dispatch(updateFriendsList({userId: creator._id}))
      setAnchorEl(null)
    }else{
      dispatch(createNotification({
        text:`${userInfo.username} has sent you a friend request`, 
        recipients: creator._id, 
        type: 'friendshipRequest',
        socket: socket
      }))
      setAnchorEl(null)
    }
  } 

  return(
    <>
      <Avatar alt='A' onMouseOver={e => setAnchorEl(e.currentTarget)} src={creator.avatar}>
        {creator.username.charAt(0).toUpperCase()}
      </Avatar>
      <Menu
        disableScrollLock
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{ onMouseLeave: () => setAnchorEl(null)}}
      >
        <Stack spacing={2} direction='row' p={1}>
          <Avatar 
            sx={{ height: 70, width: 70, fontSize: 50, textDecoration:'none' }} 
            alt=''
            component={Link}
            to={`profile/${creator._id}`}
            src={creator.avatar}
          >
            {creator.username.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant='body1' mb='5px'>{creator.username}</Typography>
            <Typography variant='body2'>Friends: { creator?.friends?.length}</Typography>
            <Typography variant='body2'>City: { creator.city}</Typography>
          </Box>
        </Stack> 
        {
          userInfo._id !== creator._id && 
          <Stack direction='row' spacing={1} p={1}>
            <Button 
              variant='contained' 
              startIcon={userInfo?.friends.find(f => f._id === creator?._id ) ? <PersonRemove /> : <PersonAdd />}
              onClick={handleFriendship}
            >
              {userInfo?.friends.find(f => f._id === creator?._id ) ? 'Remove ' : 'Add'}
            </Button>
            <Button component={Link} to={`message/${creator._id}`} variant='contained' startIcon={<Send />}>Send Message</Button>
          </Stack> 
        }
      </Menu>
    </>
  )
}