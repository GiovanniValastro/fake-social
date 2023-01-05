import React from 'react';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const InputText = ({icon, name, type, defaultValue='', onChange, autoFocus, label, handleShowPassword}) => {

  return(
    <Box mb={2.5} display='flex' alignItems='flex-end'>
      <TextField 
        fullWidth
        label={label}
        defaultValue={defaultValue}
        type={type}
        autoFocus={autoFocus}
        onChange={onChange}
        multiline={name === 'bio'}
        rows={4}
        InputProps={{
          startAdornment: ( <InputAdornment position='start' children={icon} /> ),   
          endAdornment: (name === 'password' &&
            <InputAdornment position='end'>
              <IconButton 
                children={ type === 'password' ? <Visibility /> : <VisibilityOff />} 
                onClick={handleShowPassword} 
              />                
            </InputAdornment>
          )}
        }
      />  
    </Box>
  )
}
