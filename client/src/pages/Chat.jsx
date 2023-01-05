import React, { useEffect, useRef } from 'react';
import { Grid, Avatar, Typography, Box, ImageListItem, ImageListItemBar,Stack } from '@mui/material';
import { Form } from '../components/Form';
import { Sidebar } from '../components/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from '../features/users/usersActions';
import { deleteMessage, getMessages } from '../features/messages/messagesActions';
import moment from 'moment';
import { Delete } from '@mui/icons-material';
import { DataUser } from './Profile/infUser/dataUser';

export const Chat = ({mobileOpen, setMobileOpen}) => {
  
  const { userInfo } = useSelector(state => state.auth);
  const { users } = useSelector(state => state.users);
  const { messages } = useSelector(state => state.messages);
  const { id } = useParams();
  const messagesRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(id))
    dispatch(getMessages({recipient: id}))
    messagesRef.current.scrollIntoView({ behavior: 'auto' })
  },[dispatch, id])

  return(
    <Grid container>
      <Grid item sm={4} md={3} children={<Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />} />
      <Grid item xs={12} sm={8} md={6} height='90vh' flex={1}>
        <Box p={2} bgcolor='background.secondary' height={70} width='100%' display='flex' alignItems='center' justifyContent='flex-start'>
            <Avatar src={users.avatar} alt=''>
              {users.username && users?.username.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant='h6' ml={1}>{users.username}</Typography>
        </Box> 
        <Box p={2} height={410} position='relative' boxShadow={2} overflow='scroll' bgcolor='background.primary'>
          {messages.map(message => (
            <Box key={message._id}> 
              { message.images.length > 0 ? 
                message.images.map((image, index) =>
                  <Box key={index}>                      
                    <ImageListItem 
                      sx={{
                        mb:2,
                        float:'right',
                        width:270,
                        borderRadius: 2,
                        border:'4px solid', 
                        borderColor:message.sender === userInfo._id ? 'background.message' : 'background.secondary'
                      }}
                    >
                      <img style={{ maxWidth:'270px'}} src={image.url} alt='' loading='lazy' />
                      { index === message.images.length - 1 &&
                        <ImageListItemBar
                          sx={{ bgcolor: message.sender === userInfo._id ? 'background.message' : 'background.secondary'}}
                          title={<Typography color={message.sender === userInfo._id ? '#ffffff' : 'color.default'}>{message.text}</Typography>}
                          subtitle={<span>{moment(message?.createdAt).fromNow()}</span>}
                          position='below'                          
 
                        />
                      }                     
                    </ImageListItem>            
                    <Delete sx={{ cursor:'pointer', float:'right'}} onClick={() => dispatch(deleteMessage(message._id))} />          
                  </Box>
                ) :           
                <Stack sx={{clear: 'right'}} direction='row' justifyContent={message.sender === userInfo._id ? 'end' : 'start'}> 
                  { message.sender === userInfo._id && 
                    <Delete sx={{cursor:'pointer'}} onClick={() => dispatch(deleteMessage(message._id))} />
                  }
                  <Box 
                    style={{ wordWrap: "break-word" }}
                    minWidth={130}
                    maxWidth={400} 
                    width='auto'
                    py={0.5} 
                    px={1} 
                    minHeight={40}
                    color={message.sender === userInfo._id ? '#ffffff' : 'color.default'}
                    bgcolor={message.sender === userInfo._id ? 'background.message' : 'background.secondary'}
                    borderRadius={3} 
                    mb={2} 
                  >
                    {message.text}
                    <Typography variant='body2' color={message.sender === userInfo._id ? 'lightgray': 'color.secondary'}>
                      {moment(message?.createdAt).fromNow()}
                    </Typography>
                  </Box> 
                </Stack> 
              }    
            </Box> 
          ))}            
          <div ref={messagesRef} />     
        </Box>              
        <Box position='absolute' bottom={0} mx='auto' sx={{width:{xs:'100%', sm:'66.7%', md:'50%'}}}>     
          <Form form='message' label='Write message' py={0} creator={id} onClose={() => messagesRef.current.scrollIntoView({ behavior: 'smooth' })} />
        </Box>
      </Grid>  
      <Grid 
        item 
        md={3} 
        bgcolor='background.primary' 
        flexDirection='column'
        display='flex' 
        alignItems='center' 
        justifyContent='center' 
        sx={{ display: { xs:'none', sm: 'none', md:'flex' } }} 
      >
        <Avatar sx={{ height: 225, width: 225, fontSize: 200, border:'3px solid #1976D2', mb:{xs:2, sm:2}}} src={users.avatar} alt=''>
          {users.username && users?.username.charAt(0).toUpperCase()}
        </Avatar>
        <DataUser users={users} />
      </Grid>
    </Grid>  
  )
} 