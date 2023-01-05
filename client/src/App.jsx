import React, { useState, useEffect, useMemo } from 'react';
import './App.css'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getNotifications } from './features/notifications/notificationsActions';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollToTop } from './utils/ScrollToTop';
import { Navbar } from './components/navbar/Navbar';
import { Home } from './pages/Home';
import { Auth } from './pages/auth/Auth';
import { Profile } from './pages/Profile/Profile';
import { NotFound } from './pages/NotFound';
import { Footer } from './components/Footer';
import { SocketClient } from './utils/socketClient';
import { Tag } from './pages/Tags';
import { SinglePost } from './pages/SinglePost';
import { Chat } from './pages/Chat';
import { Box } from '@mui/material';

export const App = () => {

  const { userInfo } = useSelector(state => state.auth);
  const { darkMode } = useSelector(state => state.theme);
  const [mode, setMode] = useState('light');
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();

  useMemo(() => {
    darkMode ? setMode('dark') : setMode('light')
  }, [darkMode])

  useEffect(() => {
    dispatch(getNotifications())
  },[dispatch])

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        ...(mode === 'light'
        ? {
            background: { primary: 'white', secondary: '#eeeeee', message: '#006ACC', cover:'#eeeeee'},
            color: { default: '#22222', secondary:'#555555' },          
          }
        : {
            background: { primary: '#272727', secondary: '#333333', message: '#05445B', cover:'#111112'},
            color: { default: '#eeeeee', secondary:'#999999' },
          }),
      },
    })
  ,[mode]);

  return(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ScrollToTop />
        {userInfo?.username &&  
          <>
            <Navbar setMobileOpen={() => setMobileOpen(!mobileOpen)} />
            <SocketClient /> 
            <ToastContainer theme={ mode === 'light' ? 'light' : 'dark' } />    
          </>
        }
        <Box pt={8} minHeight='100vh' bgcolor='background.cover'>
          <Routes>
            <Route exact path='/' element={userInfo?.username ?
              <Home mobileOpen={mobileOpen} setMobileOpen={() => setMobileOpen(!mobileOpen)}/> : 
              <Navigate to='/auth' replace /> }/>   
            <Route exact path='/message/:id' element={<Chat mobileOpen={mobileOpen} setMobileOpen={() => setMobileOpen(!mobileOpen)} />}/>
            <Route exact path='/auth' element={<Auth />}/>
            <Route exact path='/profile/:id' element={<Profile />}/>
            <Route exact path='/post/tag/:tag' element={<Tag />}/>
            <Route exact path='/post/:id' element={<SinglePost />}/>
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </Box> 
        {!userInfo?.username && <Footer />}
      </Router>
    </ThemeProvider>
  ) 
}

