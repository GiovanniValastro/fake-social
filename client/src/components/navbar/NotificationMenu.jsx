import React, { useState } from 'react';
import { IconButton, Badge, Menu, MenuItem, Avatar, Typography, ListItemAvatar, ListItemText, ListItemIcon, Divider, Box, Button } from '@mui/material';
import { Delete,DeleteForever, Notifications } from '@mui/icons-material';
import { useSelector, useDispatch  } from 'react-redux';
import { updateNotification, deleteNotification, deleteAllNotifications } from '../../features/notifications/notificationsActions';
import { createNotification } from '../../features/notifications/notificationsActions';
import { updateFriendsList } from '../../features/users/usersActions';
import { Link } from 'react-router-dom';
import moment from 'moment';

export const NotificationMenu = () => {
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { notifications } = useSelector(state => state.notification);
  const { userInfo } = useSelector(state => state.auth); 
  const { socket } = useSelector(state => state.socket);
  const dispatch = useDispatch();

  const handlenotifications = e => {
    setAnchorEl(e.currentTarget) 
    if( notifications.filter(notify => notify.isRead === false ).length === 0 ) return;
    dispatch(updateNotification())
  }

  const handleNewFriends = (id, userId) => {
    dispatch(updateFriendsList({userId, socket}))
    dispatch(deleteNotification(id))
    dispatch(createNotification({recipients: userId, text:`${userInfo.username} has accepted your friend request`, socket}))
  }

  return (
    <Box>
      <IconButton onClick={handlenotifications}>
        <Badge 
          children={<Notifications />}
          color='error'
          badgeContent={notifications ? 
            notifications.filter(notify => notify.isRead === false ).length : 0
          } 
        />          
      </IconButton>  
      <Menu
        disableScrollLock
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <Typography p={2} variant='h6'>Notifications</Typography> 
        <Divider />

        { notifications && notifications.length > 0 ?
          <Box> 
            {[...notifications].reverse().map(notify => (
              <MenuItem key={notify._id}>
                <ListItemAvatar 
                  children= {
                    <Avatar 
                      sx={{ textDecoration: 'none' }} 
                      component={Link} 
                      to={`post/${notify.componentId}`} 
                      src={notify.sender.avatar} 
                      alt=''
                    >
                      {notify.sender.username.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                />
                <Box>            
                  <ListItemText 
                    primary= {
                      <Typography 
                        component={Link} 
                        variant='body2'
                        to={`post/${notify.componentId}`}
                        sx={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {notify.text}
                      </Typography>
                    } 
                    secondary={moment(notify.createdAt).fromNow()}> 
                  </ListItemText> 
                    { notify.type === 'friendshipRequest' && 
                    <Button
                      sx={{display:'block'}} 
                      size='small' 
                      variant='contained' 
                      onClick={() => handleNewFriends(notify._id, notify.sender._id)}
                    >
                      Confirm
                    </Button>
                  }
                </Box> 
                <Box flexGrow={1} />
                <IconButton children={<Delete />} sx={{ ml: 1 }} onClick={() => dispatch(deleteNotification(notify._id))} />    
              </MenuItem>
            ))}
            <Divider />
            <MenuItem sx={{ display: 'flex', justifyContent: 'center' }} onClick={() => dispatch(deleteAllNotifications())}>
              <Box display='flex' justifyContent='center'>
                <ListItemIcon children={<DeleteForever />} />                
                <ListItemText primary={ <Typography fontSize={18}>Delete all notifications</Typography> } />
              </Box>
            </MenuItem>
          </Box> :
          <Typography p={2}>No notification present</Typography>
        }
      </Menu>
    </Box>
  )
}