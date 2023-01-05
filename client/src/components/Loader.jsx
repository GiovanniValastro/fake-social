import { Grid } from '@mui/material';
import React from 'react';
import Spinner from '../imgs/social-media.gif';

export const Loader = () => {
  return(
    <Grid alignItems='center' justifyContent='center' display='flex' minHeight='90vh' container>
      <Grid item width={250} height={250} bgcolor='background.message' alignItems='center' justifyContent='center' display='flex' borderRadius={2}>
        <img style={{width:'150px', color: 'white'}} src={Spinner} alt=''/>
      </Grid>
    </Grid>
  )  
}