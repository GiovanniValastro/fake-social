import React from 'react';
import { Box, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <Box display='flex' justifyContent='center' p={4} bgcolor='black' height={150}>
       <Typography>© 2022 Mern Stack Project. All rights reserved.</Typography>
    </Box>
  )
}