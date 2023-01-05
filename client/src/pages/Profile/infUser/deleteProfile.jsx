import React from 'react';
import { Dialog, DialogActions, DialogTitle, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../features/auth/authSlice';
import { deleteUser } from '../../../features/users/usersActions';

export const DeleteProfile = ({open, onClose}) =>  {

  const navigate = useNavigate();
  const dispatch = useDispatch();  
  const { userInfo } = useSelector(state => state.auth) ; 

  const handleDelete = async () => {
    await dispatch(deleteUser(userInfo?._id));
    dispatch(logout()); 
    navigate('/auth');  
  }
    
  return (
    <Dialog
      onClose={onClose} 
      maxWidth='xl' 
      open={open} 
      PaperProps={{ sx: { p: 3, bgcolor: 'background.primary' }}}
    > 
      <DialogTitle>
        <Typography variant='h5' mb={1}>Are you sure you want to delete your account?</Typography>
        <Typography paragraph>All connected information will be permanently lost.</Typography>
      </DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </DialogActions>  
    </Dialog> 
  )
}