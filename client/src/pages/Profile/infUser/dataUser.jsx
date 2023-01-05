import React from 'react';
import { Box, ListItem, ListItemText } from '@mui/material';
import { AccountCircle, LocationOn, Cake, Male, NoteAlt, Group } from '@mui/icons-material';
import moment from 'moment';

export const DataUser = ({users}) => {
    
    const Infomations = ({icon, info, data}) => {
      return(
        <>
          { data && 
            <ListItem p={1}>
              {icon}&nbsp;&nbsp;
              <ListItemText primary={<p><strong style={{fontSize: 18}}>{info}</strong>{  data}</p>} />
            </ListItem> 
          }
        </>
      ) 
    }

  return(
    <Box>
      <Infomations icon={<AccountCircle />} info='Username: ' data={users?.username}/>
      <Infomations icon={<LocationOn />} info='City: ' data={users?.city}/>
      <Infomations icon={<Male />} info='Gender: ' data={users?.gender}/>
      { users?.dateOfBirth && <Infomations icon={<Cake />} info='Date of birth: ' data={moment.utc(users?.dateOfBirth).format('MM/DD/YYYY')}/> }
      {users?.friends?.length > 0 && <Infomations icon={<Group />} info='Friends: ' data={users?.friends?.length}/> }
      <Infomations icon={<NoteAlt />} info='Bio: ' data={users?.bio}/>
    </Box>
  )  
}  