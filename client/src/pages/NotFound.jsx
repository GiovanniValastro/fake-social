import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' minHeight='90vh' flexDirection='column'>
      <Typography justify='center' align='center' variant='h2' fontWeight='bold'>Page not found.</Typography>
      <Typography variant='h5'>Please go to 
        <Typography variant='h5' component={Link} color='textPrimary' to='/'> Home</Typography>
      </Typography>
    </Box>
  )
}