import React, { useState } from 'react';
import { Typography, Grid, IconButton, Box } from '@mui/material';
import { ThumbUpAltOutlined, ThumbUpAlt, Reply, Edit, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { likeComment, deleteComment } from '../../../features/posts/commentActions';
import { Form } from '../../Form';
import { EditComponent } from '../EditComponent';
import { AvatarUser } from '../Avatar';
import moment from 'moment';

export const Comment = ({text, creator, replyUser, createdAt, id, likes, postId, replyComment, children}) => {

  const { userInfo } = useSelector(state => state.auth);
  const { socket } = useSelector(state => state.socket);
  const [onReply, setOnReply] = useState(false);
  const [openEditComment, setOpenEditComment] = useState(false);
  const dispatch = useDispatch();

  return( 
    <>
      <Grid container wrap='nowrap' mt={1.5} spacing={0.5}>
        <Grid item mr={1} children={<AvatarUser creator={creator}/>} />          
        <Grid bgcolor='background.secondary' justifyContent='left' borderRadius={1} item xs>
          <Typography 
            component={Link} 
            to={`/profile/${creator._id}`}
            ml={1}
            color='inherit'
            fontSize={15}
            fontWeight='bold' 
            sx={{ textDecoration: 'none'}}
          >
            {creator.username}
          </Typography>
          <Typography ml={1} mb={1} fontSize='15px'>
            { replyUser  && 
              <Typography component={Link} color='#1976D2' sx={{textDecoration:'none'}} mr={1} to={`/profile/${replyUser}`}>
                @{replyUser.username}
              </Typography>
            }
            {text}
          </Typography>
          <Box display='flex'>
            <IconButton disabled={!userInfo} color='inherit' onClick={() => dispatch(likeComment({id, socket}))}>
              { likes.includes(userInfo?._id) ? <ThumbUpAlt fontSize='small'/> : <ThumbUpAltOutlined fontSize='small'/> }
            </IconButton>
            <Typography mt={1} display='inline'>{likes.length}</Typography>
            <Box flexGrow={1} />
            <Typography fontSize='14px' mt= {1}>{moment(createdAt).fromNow()}</Typography>
          
            <IconButton children={<Reply fontSize='small'/>} onClick={() => setOnReply(!onReply)} />
            { userInfo._id === creator._id &&
              <>
                <IconButton children={<Edit fontSize='small'/>} onClick={() => setOpenEditComment(true)} /> 
                <IconButton children={<Delete fontSize='small'/>} onClick={() => dispatch(deleteComment(id))} />
              </>
            }
          </Box>
          <Box pr={0.5}>
            {onReply && 
              <Form 
                label='Write a comment' 
                form='replyComment' 
                replyUser={creator} 
                commentId={replyComment ? replyComment : id} 
                postId={postId} 
                showReply={() => setOnReply(false)}
              />
            }
          </Box>  
          <EditComponent open={openEditComment} onClose={() => setOpenEditComment(false)} dialog='comment' text={text} id={id}/>
        </Grid>
      </Grid>
      {children}
    </>
  )  
}
