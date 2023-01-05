import React, { useState } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { InfUser } from './infUser/InfUser';
import { MyPosts } from './MyPosts';
import { Friends } from './Friends';
import { Foto } from './Foto';
import { Likes } from './Likes';
import { PermDeviceInformation, People, Comment, Image, ThumbUpAlt } from '@mui/icons-material'; 

export const Profile = () => {

  const [tab, setTab] = useState('infUser');
 
  return(
    <TabContext  value={tab}>
      <Box borderBottom={1} borderColor='divider' display='flex' justifyContent='center' width='100%'>
        <TabList variant='scrollable' scrollButtons allowScrollButtonsMobile onChange={(e, newTab) => setTab(newTab)} >
          <Tab icon={<PermDeviceInformation/>} value='infUser' />
          <Tab icon={<People />} value='friends' />
          <Tab icon={<Comment />} value='posts' />
          <Tab icon={<Image />} value='foto' />    
          <Tab icon={<ThumbUpAlt />} value='likes' />   
        </TabList>
      </Box>
      <TabPanel value='infUser' children={<InfUser />} />
      <TabPanel value='friends' children={<Friends tab={tab} setTab={setTab}/>} />        
      <TabPanel value='posts' children={<MyPosts tab={tab} setTab={setTab}/>} />  
      <TabPanel value='foto' children={<Foto tab={tab} setTab={setTab}/>} />
      <TabPanel value='likes' children={<Likes tab={tab} setTab={setTab}/>} />      
    </TabContext>
  )
}