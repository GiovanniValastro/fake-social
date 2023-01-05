import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPost } from '../features/posts/postActions';
import { Box, Grid, Typography, IconButton, Avatar, ListItemAvatar, ListItemText } from '@mui/material';
import { Form } from '../components/Form';
import { CommentsList } from '../components/posts/comments/Comments';
import { Post } from '../components/posts/Post'
import { ThumbUpAltOutlined, ThumbUpAlt } from '@mui/icons-material';
import { Shared } from '../components/posts/Shared';
import { likePost } from '../features/posts/postActions';
import { createNotification } from '../features/notifications/notificationsActions';
import { Link } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import moment from 'moment';
import 'react-image-gallery/styles/css/image-gallery.css';

export const SinglePost = () => {
  
  const { id } = useParams();  
  const { posts } = useSelector(state => state.posts);
  const { userInfo } = useSelector(state => state.auth);
  const { socket } = useSelector(state => state.socket);
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(getPost(id))
  },[dispatch, id])

  const handleLike = async () => {
    await dispatch(likePost({id, socket}));
    if(posts.creator._id === userInfo._id || posts.likes.includes(userInfo._id)) return;
    dispatch(createNotification({recipients: posts.creator._id, componentId: id, text:`${userInfo.username} liked your post`, socket}))
  }

  return(
    <>
      { posts.images && posts.images.length > 0 ?
        <Grid container bgcolor='background.primary' minHeight='90vh'>
          <Grid item xs={12} md={8}>
            <Box bgcolor='background.primary' height='100%' borderRight='1px solid gray'>
              {
                posts?.images.length > 0 && 
                <ImageGallery items={posts?.images.map(i => ({original: i.url, thumbnail: i.url}))} />
              }  
            </Box>
          </Grid> 
          <Grid item xs={12} md={4}>
            <Box bgcolor='background.primary' height='90%' overflowY='scroll' p={1.5}>
              <Box display='flex' alignItems='center'>
                <ListItemAvatar children={ <Avatar component={Link} to={`/profile/${posts.creator._id}`} src={posts.creator.avatar} /> } />       
                <ListItemText 
                  primary={
                    <Typography 
                      component={Link} 
                      sx={{textDecoration:'none', color:'inherit' }} 
                      to={`/profile/${posts.creator._id}`}
                    >
                      {posts.creator.username}
                    </Typography>
                  } 
                  secondary={moment(posts.createdAt).fromNow()} />
              </Box>
              <Typography variant='body1' mt={1} mb={1}>{posts.text}</Typography>
              <Box display='flex' justifyContent='space-between' pt={1} >
                <Box>
                  <IconButton
                    children={ posts?.likes && posts?.likes.includes(userInfo?._id) ? <ThumbUpAlt /> : <ThumbUpAltOutlined/> }
                    disabled={!userInfo} 
                    color='inherit' 
                    onClick={handleLike} 
                  />                   
                  <Typography display='inline'>{posts.likes.length}</Typography>
                </Box>
                <Shared />
                <Box mt={1}>{posts.comments.length} comments</Box>
              </Box>
              <Form label='Write a comment' form='comment' postId={posts._id} py={0} />
              <CommentsList post={posts.comments} postId={posts._id} />
            </Box>
          </Grid>      
        </Grid> :
          <>
            { posts.text &&
              <Grid container justifyContent='center' mt={13}>
                <Grid item xs={11} md={5}>
                  <Post
                    id={posts._id}
                    text={posts.text}  
                    creator={posts.creator}
                    createdAt={posts.createdAt}
                    likes={posts.likes}  
                    comments={posts.comments} 
                    tags={posts.tags}
                    selectedFile={posts.images}  
                  />
                </Grid>   
              </Grid>
            }
        </>
    }
    </>    
  )
}