import React, { useEffect } from 'react';
import { Grid, Container, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '../components/Form';
import { Posts } from '../components/posts/Posts';
import { getPosts } from '../features/posts/postActions';
import { Sidebar } from '../components/Sidebar';
import { Loader } from '../components/Loader';

export const Home = ({mobileOpen, setMobileOpen}) => {

  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(getPosts())
  },[dispatch])

  return(
    <>
      { Array.isArray(posts) > 0 ?
        <Grid container>
          <Grid item xs={3} sm={4}>
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          </Grid>
          <Grid item sm={8} md={5.5} xs={12}>
            <Container>
              <Box mt={3} />
              <Form label='Share with your friends what you are thinking' form='post'/>
              <Box mb={3} />
              <Posts />
            </Container>
          </Grid>
        </Grid> :
        <Loader />
      }
    </>   
  ) 
} 