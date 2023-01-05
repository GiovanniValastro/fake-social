import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Slide, Card, CardHeader, IconButton, Typography, CardContent, CardActions, Collapse, Box, ListItemIcon, Menu, MenuItem, ListItemText } from '@mui/material';
import { Delete, Edit, ThumbUpAlt, ThumbUpAltOutlined, ExpandMore, MoreVert, ReadMore } from '@mui/icons-material';
import { deletePost, likePost } from '../../features/posts/postActions';
import { createNotification } from '../../features/notifications/notificationsActions';
import { useSelector, useDispatch } from 'react-redux';
import { EditComponent } from './EditComponent';
import { CommentsList } from './comments/Comments';
import { AvatarUser } from './Avatar';
import { Form } from '../Form';
import { Shared } from './Shared';
import moment from 'moment';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

export const Post = ({text, creator, likes, createdAt, id, comments, tags, selectedFile}) => {

  const [readMore, setReadMore] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [openEditPost, setOpenEditPost] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { userInfo } = useSelector(state => state.auth);
  const { socket } = useSelector(state => state.socket);
  const dispatch = useDispatch();

  const Expand = styled(props => {
    const { expand, ...other } = props;
    return <>
            <IconButton {...other} />
            <Typography>{comments.length} comments</Typography>
           </>;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));   

  const handleLike = async () => {
    await dispatch(likePost({id, socket}));
    if(creator._id === userInfo._id || likes.includes(userInfo._id)) return;
    dispatch(createNotification({recipients: creator._id, componentId: id, text:`${userInfo.username} liked your post`, socket}))
  }
  
  const handleEditPost = () => {
    setOpenEditPost(true)
    setAnchorEl(null)
  }

  const handleDeletePost = () => {
    dispatch(deletePost(id))
    setAnchorEl(null)
  }

  return(
    <Slide direction="up" in timeout={2000}>
      <Card sx={{mb: 2, width: '100%'}}>
        <CardHeader 
          avatar={<AvatarUser creator={creator}/>}
          subheader={moment(createdAt).fromNow()}
          title={ 
            <Box 
              component={Link} 
              color='inherit' 
              sx={{textDecoration: 'none'}} 
              to={`/profile/${creator._id}`}
            >
              {creator.username}
            </Box>
          }
          action={ 
            userInfo?._id === creator._id &&
            <>
              <IconButton children={<MoreVert />} onClick={e => setAnchorEl(e.currentTarget)} />                
              <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)} disableScrollLock>
                <MenuItem onClick={handleEditPost} divider>
                  <ListItemIcon children={<Edit /> } />                    
                  <ListItemText primary='Edit Post' />
                </MenuItem>
                <MenuItem onClick={handleDeletePost}>
                  <ListItemIcon children={<Delete />} />                     
                  <ListItemText primary='Delete Post' />
                </MenuItem>
              </Menu>
            </>
          }  
        />
        <CardContent>
          <Typography display='inline'>{readMore ? text : text.slice(0, 150)}</Typography>  
          {text.length > 150  &&
            <Typography onClick={() => setReadMore(!readMore)} color='#1976D2' display='inline' sx={{cursor: 'pointer'}} >
              {readMore ? ' Hidden' : '...Read more'}
            </Typography>  
          }  
          <Box mt={2} />
          {tags.map(tag =>
            <Typography 
              key={tag}
              component={Link} 
              variant='body2' 
              display='inline'
              color='#1976D2' 
              mr={1}
              to={`../post/tag/${tag}`} 
              sx={{textDecoration: 'none'}}
            >
              #{tag}
            </Typography>        
          )} 
        </CardContent>
        {selectedFile.length > 0 && <ImageGallery scr items={selectedFile.map(i => ({ original: i.url, thumbnail: i.url }))}/>}  
        <CardActions disableSpacing>
          <IconButton disabled={!userInfo} color='inherit' onClick={handleLike}>
            { likes.includes(userInfo?._id) ? <ThumbUpAlt /> : <ThumbUpAltOutlined/> }
          </IconButton>
          <Typography display='inline'>{likes.length}</Typography>
          <Shared url={`${window.location.href}/post/${id}`}/>
          <IconButton children={<ReadMore />} component={Link} to={`/post/${id}`} />            
          <Expand children={<ExpandMore />} expand={expanded} onClick={() => setExpanded(!expanded)} />            
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Form label='Write a comment' form='comment' creator={creator} postId={id}/>
            <CommentsList post={comments} postId={id}/>
        </CardContent>
        </Collapse>  
        <EditComponent open={openEditPost} onClose={() => setOpenEditPost(false)} dialog='post' text={text} id={id} img={selectedFile} tag={tags} />
      </Card>
    </Slide>
  )
}