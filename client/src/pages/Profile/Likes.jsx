import React, { useEffect } from 'react';
import { getPostByLikes } from '../../features/posts/postActions';
import { useSelector, useDispatch } from 'react-redux';
import { Posts } from '../../components/posts/Posts';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';

export const Likes = ({ tab, setTab }) => {

  const { users } = useSelector(state => state.users);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    tab === 'likes' && dispatch(getPostByLikes(users._id)) 
  },[dispatch, tab, users._id])

  return(
    <>
      { users._id === id ?
          <Grid container justifyContent='center'>
            <Grid item xs={11} md={5}>
              <Posts />
            </Grid>   
          </Grid> 
        : setTab('infUser')
      }
    </>
  )  
} 