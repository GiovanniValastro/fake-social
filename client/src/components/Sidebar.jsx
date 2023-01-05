import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Search,ChevronRight, Message } from '@mui/icons-material';
import { InputText } from './Input';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Stack, Badge, CircularProgress, Box, Drawer, IconButton, Divider, Typography } from '@mui/material';

export const Sidebar = ({setMobileOpen, mobileOpen}) => {

  return(
    <>
      <Drawer
        open={mobileOpen}
        PaperProps={{ style: { height: "100vh"} }}
        onClose={() => setMobileOpen(!mobileOpen)}
        ModalProps={{ keepMounted: true }}
        bgcolor='background.primary'
        overflowy='scroll'
        sx={{ 
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { width: '100%', height:100 },
        }}
      >  
        <Box display='flex' justifyContent='end' pr={1.5}>
           <IconButton children={<ChevronRight />} onClick={() => setMobileOpen(!mobileOpen)} /> 
        </Box>
        <Divider />
        <SearchFriends setMobileOpen={setMobileOpen} mobileOpen={mobileOpen}/>      
      </Drawer>

      <Drawer
        variant='permanent'
        PaperProps={{ style: { height: "90vh" } }}
        open={mobileOpen}
        sx={{
          display: { xs: 'none', sm: 'block' }, 
          '& .MuiDrawer-paper': { height: 100, width: {md:'25%', sm:'34%'}, mt: '65px', bgcolor:'background.primary'},
        }} 
      >
        <SearchFriends setMobileOpen={setMobileOpen} />      
      </Drawer>
    </> 
  ) 
}

const SearchFriends = ({setMobileOpen}) => {
  const { userInfo } = useSelector(state => state.auth);
  const { onlineFriends } = useSelector(state => state.onlineFriends);
  const [text, setText] = useState('');
  const [filteredFriends, setFilteredFriends] = useState(userInfo.friends);
  const dispatch = useDispatch();

  useEffect(() => {
    setFilteredFriends(userInfo.friends.filter(user => user.username.toLowerCase().includes(text.toLowerCase())));
  },[dispatch, text, userInfo.friends])
  
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  }));

  return(
    <Box> 
      <form onSubmit={e => e.preventDefault()}>
        <Box sx={{mt: 3, mx: 2, mb: 1, width: '90%' }}>
          <InputText icon={<Search />} name='text' label='Search friend' onChange={e => setText(e.target.value)} />
        </Box>
      </form>   
      { !userInfo.friends ? <CircularProgress /> : 
        userInfo.friends.length > 0 ? filteredFriends.map(profile => (
          <ListItem button key={profile._id}>
            <ListItemAvatar>
              <Stack direction='row' spacing={2}>
                { onlineFriends.length > 0 && onlineFriends.includes(profile._id) ?
                  <StyledBadge
                    overlap='circular'
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant='dot'
                  >
                    <Avatar component={Link} to={`../profile/${profile._id}`} src={profile.avatar} replace sx={{textDecoration:'none'}}>
                      {!profile.avatar && profile.username.charAt(0).toUpperCase()}
                    </Avatar>
                  </StyledBadge> :
                  <Avatar component={Link} to={`../profile/${profile._id}`} src={profile.avatar} replace sx={{textDecoration:'none'}}>
                    {!profile.avatar && profile.username.charAt(0).toUpperCase()}
                  </Avatar>
              }              
              </Stack>
            </ListItemAvatar>   
            <ListItemText 
              primary={
                <Typography 
                  component={Link} 
                  to={`../profile/${profile._id}`} 
                  sx={{color:'inherit', textDecoration:'none'}} 
                >
                  {profile.username}
                </Typography>
              } 
            />
            <Box flexGrow={1} />
            <IconButton component={Link} onClick={()=> setMobileOpen(false)} children={<Message />} to={`../message/${profile._id}`} />              
          </ListItem>
        )) : 
        <ListItemText sx={{textAlign: 'center'}} primary='No friends found' />
      } 
    </Box> 
  )
}