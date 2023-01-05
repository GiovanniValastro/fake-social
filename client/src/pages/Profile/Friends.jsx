import React, { useState } from 'react';
import { Avatar, Box, Typography, IconButton,  Menu, MenuItem, ListItemText, ListItemIcon } from '@mui/material';
import { Message, MoreVert, PersonRemove } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { updateFriendsList } from '../../features/users/usersActions';

export const Friends = ({ setTab }) => {

  const { users } = useSelector(state => state.users);
  const { userInfo } = useSelector(state => state.auth);
  const { id } = useParams();
  const dispatch = useDispatch();

  const FriendsBox = ({user}) => {
    
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

    return(
      <> 
        { users._id === id ?
          <Box 
            display='flex' 
            justifyContent='space-between'
            bgcolor= 'background.primary' 
            width='80%'
            minHeight={250} 
            m='auto' 
            px={3}
            pt={3} 
            flexWrap='wrap'
            boxShadow={1}
          >
          { user.map(friend => (
            <Box 
              display='flex' 
              justifyContent='flex-start' 
              alignItems='center' 
              bgcolor= 'background.secondary'
              boxShadow={1}
              p={3}
              mb={3}
              sx={{height:100, width:'90%', maxWidth:490 }}
            > 
              <Avatar component={Link} to={`/profile/${friend._id}`} sx={{ mr:2, textDecoration:'none' }} src={friend.avatar}>
                {friend.username.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant='body1'>{friend.username}</Typography>
                <Typography variant='body2'>Friends: {friend.friends.length}</Typography>
              </Box> 
              <Box flexGrow={1} />
              { users._id === userInfo._id &&
                <>
                  <IconButton children={<MoreVert />} onClick={e => setAnchorEl(e.currentTarget)} />                
                  <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)} disableScrollLock>
                    <MenuItem onClick={() => dispatch(updateFriendsList({userId: friend._id}))} divider>
                      <ListItemIcon children={<PersonRemove /> } />                    
                      <ListItemText primary='Remove Friend' />
                    </MenuItem>
                    <MenuItem component={Link} to={`../message/${friend._id}`} >
                      <ListItemIcon children={<Message />} />                     
                      <ListItemText primary='Send Mssage' />
                    </MenuItem>
                  </Menu>
                </>
              }  
            </Box>
          ))}
          </Box> : setTab('infUser') 
        }
      </>
    )  
  } 
  
  return(
    <>
      { id === userInfo._id ?
        <FriendsBox user={userInfo.friends} /> :
        <FriendsBox user={users.friends} />
      }
    </>
  )
}