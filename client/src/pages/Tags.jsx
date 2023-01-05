import React, { useEffect } from 'react';
import { getPostByTag } from '../features/posts/postActions';
import { useDispatch } from 'react-redux';
import { Posts } from '../components/posts/Posts';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';

export const Tag = () => {

  const dispatch = useDispatch();
  const { tag } = useParams();

  useEffect(() => {
    dispatch(getPostByTag(tag)) 
  },[dispatch, tag])
    
  return(
    <Grid container justifyContent='center' alignItems='center' mt={3}>
      <Grid item xs={11} md={5}>
        <Posts />
      </Grid>   
    </Grid> 
  )  
}
