import React, { useState } from 'react';
import { Autocomplete, Chip, Button, TextField, IconButton, Badge, Grid, Box, InputAdornment, Fade } from '@mui/material';
import { createPost, updatePost } from '../features/posts/postActions';
import { createComment, updateComment } from '../features/posts/commentActions';
import { AddReaction, PhotoCamera, Send, Tag } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createNotification } from '../features/notifications/notificationsActions';
import { createMessage } from '../features/messages/messagesActions';
import Picker, { Theme } from 'emoji-picker-react';

export const Form = ({label, form, creator, postId, commentId, onClose, title, replyUser, showReply, py=3, img, tag }) => {

  const [text, setText] = useState(title ? title : '');
  const [tags, setTags] = useState(tag ? tag : []);
  const [images, setImages] = useState(img ? img : []);
  const [showPicker, setShowPicker] = useState(false); 
  const [showTagsField, setShowTagsField] = useState(false); 
  const { userInfo } = useSelector(state => state.auth);
  const { socket } = useSelector(state => state.socket);
  const { darkMode } = useSelector(state => state.theme);

  const dispatch = useDispatch();

  const handleChangeFile = e => {
    const files = [...e.target.files];
    let newImage = [];

    files.forEach(image => {
      if(!image) return 'This image not exist';
      return newImage.push(image)
    })
    setImages([...images, ...newImage])
  }

  const handleDeleteImage = index => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr)
  }


  const handleSubmit = async e => {
    e.preventDefault();
    if(text.length >= 1 ){
      if(form === 'post'){
        dispatch(createPost({ text, images, tags })); 
      }else if(form === 'comment'){
        dispatch(createComment({ text, postId })); 
        if(userInfo._id !== creator._id) 
        dispatch(createNotification({ text: `${userInfo.username} commented on your post`, componentId: postId, recipients: creator._id })); 
      }else if(form === 'replyComment'){
        dispatch(createComment({ text, postId, replyComment: commentId, replyUser: replyUser._id, replyUsername: replyUser.username }));   
        showReply(); 
        if(userInfo._id !== replyUser._id) {
          dispatch(createNotification({ text: `${userInfo.username} replied to your comment`, componentId: postId, recipients: replyUser._id })); 
        }
      }else if(form === 'updatePost'){
        dispatch(updatePost({ text, id: postId, tags, images })); 
        onClose();
      }else if(form === 'updateComment'){
        dispatch(updateComment({ text, id: commentId })); 
        onClose();
      }else if(form === 'message'){
        await dispatch(createMessage({ text, recipient: creator, images, socket })); 
        onClose();
      }
      setShowPicker(false);
      setText('');
      setImages([]);
      setTags([]);
      setShowTagsField(false)
    }else return
  }                

  return(
    <Box component={Fade} in={true} timeout={2000} bgcolor='background.primary' px={1} py={py} borderRadius={1} boxShadow={3}>
      <form autoComplete='off' onSubmit={handleSubmit} encType='multipart/form-data'>
        <TextField 
          name='title'
          fullWidth
          multiline
          label={label}
          value={text}
          variant='standard'
          onChange={e => setText(e.target.value)} 
          InputProps={{
            startAdornment: ( replyUser &&
              <InputAdornment 
                position='start'
                component={Link} 
                to={`/profile/${replyUser._id}`} 
                sx={{color: '#1976D2', textDecoration: 'none'}}
              >
                @{replyUser.username}
              </InputAdornment>
            )
          }}
        />  
        <Box display='flex' mt={1}>
          { ( form !== 'comment' && form !== 'replyComment' && form !== 'updateComment' ) &&
            <IconButton component='label'>
              <input hidden multiple accept='image/*' type='file' name='file' onChange={handleChangeFile} />
              <PhotoCamera /> 
            </IconButton> 
          }  
          <Box sx={{position:'relative'}}>
            <IconButton children={<AddReaction />} onClick={() => setShowPicker(!showPicker)} />                
            {showPicker && 
              <Box sx={{ position: 'absolute', top: form === 'message' ? -500 : 40, left: 10, zIndex:1000 }}>
                <Picker 
                  onEmojiClick={({emoji}) => setText(prevInput => prevInput + emoji)} 
                  theme={ darkMode ? Theme.DARK : Theme.LIGHT }
                />
              </Box>
            }   
            { ( form === 'post' || form === 'updatePost' ) &&  <IconButton children={<Tag />} onClick={() => setShowTagsField(!showTagsField)} /> } 
          </Box>  
          <Box flexGrow={1} />
          <Button children={<Send />} type='submit' variant='contained' />
        </Box>
         
        <Grid container spacing={2} p={2}>
          {images.map((image, index) => (
            <Grid key={index} item >
              <Badge badgeContent='x' color='error' sx={{cursor:'pointer'}} onClick={() => handleDeleteImage(index)}>
                {image.url ? 
                  <img src={image.url} alt='' style={{width: '100px', height:'100px', border: '2px solid black'}}/> :
                  <img src={URL.createObjectURL(image)} alt='' style={{width: '100px', height:'100px', border: '2px solid black'}}/> 
                }  
              </Badge>
            </Grid>
          ))} 
        </Grid>
        {
          ( showTagsField || tags.length > 0 ) && 
          <Autocomplete
            multiple
            filterSelectedOptions
            freeSolo
            options={[]}
            onChange={(e, newValue) => setTags(newValue)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} />
              ))
            }
            value={tags}
            renderInput={params => (
              <TextField
                {...params}
                multiline
                label='Enter your tags'  
                variant='standard'     
              />
            )}
          />
        }
      </form>
    </Box>
  )  
}