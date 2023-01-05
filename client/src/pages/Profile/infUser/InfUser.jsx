import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Avatar, Button, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Edit, Delete, PersonAdd, PersonRemove, Message} from '@mui/icons-material';
import { EditProfile } from './editProfile';
import { createNotification } from '../../../features/notifications/notificationsActions';
import { DeleteProfile } from './deleteProfile';
import { getUser, updateFriendsList } from '../../../features/users/usersActions';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader } from '../../../components/Loader';
import { DataUser } from './dataUser';

export const InfUser = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);  
  const { users } = useSelector(state => state.users);
  const { socket } = useSelector(state => state.socket);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    dispatch(getUser(id))
  },[dispatch, id])

  const handleFriendship = () => {
    if(users.friends.find(f => f._id === userInfo._id )) {
      dispatch(updateFriendsList({userId: users._id}))
    }else{
      dispatch(createNotification({
        text:`${userInfo.username} has sent you a friend request`, 
        recipients: id, 
        type: 'friendshipRequest',
        socket
      }))
    }
  } 

  return(
    <>
      { users ? 
        <Box   
          bgcolor= 'background.primary'
          m= 'auto' 
          boxShadow={1}
          flexWrap= 'wrap' 
          width='100%' 
          maxWidth='90%' 
          minHeight={280} 
          pt={5}    
          borderRadius={2}
        >
          <Box justifyContent='center' display= 'flex' alignItems= 'center' flexWrap='wrap'>
            {users?.username &&
              <Avatar 
                sx={{ height: 250, width: 250, fontSize: 200, border:'3px solid #1976D2', mr:{xs:0, sm:2}, mb:{xs:2, sm:0}}} 
                src={users.avatar} 
                alt=''
              >
                {users?.username.charAt(0).toUpperCase()}
              </Avatar>
            }
            <DataUser users={users}/>
          </Box>
          <Box display='flex' justifyContent={{sm:'space-between', xs:'center'}} flexWrap='wrap'>
            <Button 
              sx={{m:1}}
              variant='contained' 
              onClick={() => userInfo._id === id ? setOpenEdit(true) : handleFriendship(users._id)} 
              startIcon={ userInfo._id === id ? <Edit /> : userInfo.friends.find(f => f._id === id ) ?  <PersonRemove /> : <PersonAdd /> }
            >
              { userInfo._id === id ? 'Edit Profile' : userInfo.friends.find(f => f._id === id ) ? 'Remove friend' : 'Add friend' }
            </Button>
            <Button
              sx={{m:1}}
              variant='contained' 
              onClick={() => userInfo._id === id ? setOpenDelete(true) : navigate(`/message/${id}`) } 
              color= { userInfo._id === id ? 'error' : 'primary' }
              startIcon={ userInfo._id === id ? <Delete /> : <Message /> }
            > 
              { userInfo._id === id ? 'Delete Profile' : 'Send Message'}
            </Button>  
          </Box>
          <DeleteProfile open={openDelete} onClose={() => setOpenDelete(false)}/>
          <EditProfile open={openEdit} onClose={() => setOpenEdit(false)}/>
        </Box> : <Loader />
      }
    </>
  )
}