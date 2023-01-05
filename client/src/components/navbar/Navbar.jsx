import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { AppBar, Avatar, Box, Toolbar, IconButton, MenuItem, Menu, ListItemIcon, ListItemText } from '@mui/material';
import { Brightness4, Brightness7, AccountCircle, Logout, Home, MenuOpen } from '@mui/icons-material';
import { logout } from '../../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { asyncToggleTheme } from '../../features/theme/themeSlice';
import { NotificationMenu } from './NotificationMenu';
import decode from 'jwt-decode';

export const Navbar = ({setMobileOpen}) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useSelector(state => state.auth); 
  const theme = useTheme();

  useEffect(() => {
    const token = userInfo?.token;
    if(token) {
      const decodedToken = decode(token);
      if(decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
    }
  })

  const handleLogout = () => {
    dispatch(logout()) 
    navigate('/')    
  }

  return (
    <AppBar position='fixed' mb='40' sx={{ height:64, bgcolor:'background.primary'}}>
      <Toolbar>
        <IconButton children={<Home fontSize='large'/>} component={Link} to={'/'} edge='start' />
        <Box flexGrow={1} />
        <Box display='flex'>  
          <NotificationMenu />
          <Avatar sx={{ ml:1, cursor: 'pointer' }} onClick={e => setAnchorEl(e.currentTarget)} src={userInfo.avatar} alt=''>
            {userInfo?.username.charAt(0).toUpperCase()}
          </Avatar>
          { (location.pathname === '/' || location.pathname.includes('message')) && 
            <IconButton children={<MenuOpen />} edge='end' onClick={setMobileOpen} sx={{ display: { sm: 'none' } }} />
          }
        </Box> 
      </Toolbar>
      <Menu
        disableScrollLock
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={isMenuOpen}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem component={Link} to={`/profile/${userInfo._id}`} onClick={() => setAnchorEl(null)} divider>
          <ListItemIcon children={<AccountCircle />} />          
          <ListItemText primary='Profile' />
        </MenuItem>
        <MenuItem onClick={handleLogout} divider>
          <ListItemIcon children={<Logout />} />
          <ListItemText primary='Logout' />
        </MenuItem>
        <MenuItem onClick={() => dispatch(asyncToggleTheme())}> 
          {theme.palette.mode === 'dark' ? 
            <>
              <ListItemIcon children={<Brightness4 />} />
              <ListItemText primary='Dark Mode' />
            </> :
            <>
              <ListItemIcon children={<Brightness7 />} />   
              <ListItemText primary='Ligth Mode' />
            </> 
          }
        </MenuItem>
      </Menu>
    </AppBar>       
  );
}