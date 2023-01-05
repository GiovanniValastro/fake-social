import React, { useState } from 'react';
import { Avatar, Dialog, DialogActions, Box, Button, FormLabel, TextField, Grid, FormControlLabel, Radio, RadioGroup} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { InputText } from '../../../components/Input';
import { AccountCircle, Lock, Email, Home, NoteAlt, PhotoCamera } from '@mui/icons-material';
import { updateUser } from '../../../features/users/usersActions';
import { useSelector, useDispatch } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const EditProfile = ({ onClose, open }) => {
 
  const [showPassword, setShowPassword] = useState(false);
  const { userInfo } = useSelector(state => state.auth); 
  const [username, setUsername] = useState(userInfo.username)
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState(userInfo.password)
  const [dateOfBirth, setDateOfBirth] = useState(userInfo.dateOfBirth)
  const [gender, setGender] = useState(userInfo.gender)
  const [city, setCity] = useState(userInfo.city)
  const [bio, setBio] = useState(userInfo.bio)
  const [avatar, setAvatar] = useState('');
  const dispatch = useDispatch();
  
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateUser({id: userInfo._id, user: { username, avatar, password, email, gender, bio, city, dateOfBirth}}));
    onClose();
  }
  
  return (
    <Dialog
      onClose={onClose} 
      maxWidth='xl' 
      open={open} 
      PaperProps={{ sx: { p: 3, bgcolor: 'background.primary', boxShadow:1 }}}
    > 
      <form onSubmit={handleSubmit} >
        <Avatar 
          sx={{ height: 150, width: 150, fontSize: 150, mb: 2, mx:'auto', border:'3px solid #1976D2' }} 
          alt={userInfo.username.charAt(0).toUpperCase()}
          src={ avatar ? URL.createObjectURL(avatar) : userInfo.avatar }
        >
          
        </Avatar>   
        <Box textAlign='center'>
          <Button component='label' variant='contained' sx={{ mb:3 }}>Change image
            <input hidden multiple accept='image/*' type='file' name='file' onChange={e => setAvatar(e.target.files[0])} />
            <PhotoCamera /> 
          </Button>  
        </Box>
        <Grid container display='flex' wrap='wrap' spacing={2}>
          <Grid item xs={12} sm={6}>
            <InputText icon={<AccountCircle />} name='username' label='Username' defaultValue={username} onChange={e => setUsername(e.target.value)} />
            <InputText icon={<Email />} name='email' type='email' label='Email' defaultValue={email} onChange={e => setEmail(e.target.value)} />
            <InputText 
              icon={<Lock />} 
              name='password' 
              label='Password' 
              defaultValue={userInfo.password} 
              type={showPassword ? 'text' : 'password'} 
              handleShowPassword={() => setShowPassword(!showPassword)} 
              onChange={e => setPassword(e.target.value)} 
            />
            <FormLabel>Gender:</FormLabel>   
            <RadioGroup row value={gender} onChange={e => setGender(e.target.value)}>
              <FormControlLabel value='male' control={<Radio />} label='Male' />
              <FormControlLabel value='female' control={<Radio />} label='Female' />
            </RadioGroup>
          </Grid>
                    
          <Grid item xs={12} sm={6}> 
            <InputText icon={<Home />} onChange={e => setCity(e.target.value)} name='city' label='City' defaultValue={city} /> 
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label='Data of bird'
                inputFormat='MM/DD/YYYY'
                value={dateOfBirth}
                onChange={newDateOfBirth => setDateOfBirth(newDateOfBirth)}
                InputAdornmentProps={{ position: 'start' }}
                renderInput={params => <TextField fullWidth  sx={{mb: 2.5}} {...params} />}
              />
            </LocalizationProvider> 
            <InputText icon={<NoteAlt />} defaultValue={bio} name='bio' label='Bio' onChange={e => setBio(e.target.value)} value={bio} /> 
          </Grid>
        </Grid>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type='submit'>Edit</Button>
        </DialogActions>  
      </form>
    </Dialog>
  );
} 
 