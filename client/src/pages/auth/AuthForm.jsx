import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, FormControlLabel, Alert } from '@mui/material';
import { AccountCircle, Lock, Email } from '@mui/icons-material';
import { signIn, signUp } from '../../features/auth/authActions';
import { InputText } from '../../components/Input';

export const AuthForm = ({ tab }) => {
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setCecked] = useState(false);
  const { userInfo, err } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo?.username) {
      navigate('/')
    };
  },[userInfo, navigate])

  const handleSubmit = e => {
    e.preventDefault();
    if(tab === 'signUp' ) {
      if(password === confirmPassword) {
        dispatch(signUp({username, email, password, confirmPassword}));
      }else{
        setPasswordError(true)
      }
    }else{
      dispatch(signIn({email, password}))
    }
  }
 
  return (
    <form onSubmit={handleSubmit}>     

      { tab === 'signUp' &&
        <InputText icon={<AccountCircle />} name='username' label='Name' autoFocus onChange={e => setUsername(e.target.value)} /> 
      }
      <InputText
        icon={<Email />}       
        name='email' 
        label='Email' 
        type='email'
        onChange={e => setEmail(e.target.value)} 
      />
      <InputText
        icon={<Lock />} 
        name='password'
        label='Password' 
        type={showPassword ? 'text' : 'password'} 
        handleShowPassword={() => setShowPassword(!showPassword)}
        onChange={e => setPassword(e.target.value)} 
      />
      { tab === 'signUp' &&
        <>
          <InputText
            icon={<Lock />} 
            name='confirmPassword' 
            label='Confirm Password' 
            type={showPassword ? 'text' : 'password'} 
            onChange={e => setConfirmPassword(e.target.value)}
            handleShowPassword={() => setShowPassword(!showPassword)}
          />
      
          <FormControlLabel         
            label='I accept Terms and Conditions'
            control={
              <Checkbox
                required
                checked={checked}
                onChange={e => setCecked(e.target.checked)}
              />
            } 
          /> 
        </>
      }

      <Button type='submit' fullWidth variant='contained' sx={{my : 2}}>{ tab === 'signUp' ? 'sign Up' : 'sign In'  }</Button>
      
      { passwordError && tab === 'signUp' && <Alert severity='error' variant='filled' sx={{ mb: 2 }}>Password don't match</Alert> }
      { err && tab === 'signIn' && <Alert severity='error' variant='filled' sx={{ mb: 2 }}>Email or password is wrong</Alert> }
    </form>
  )
}
