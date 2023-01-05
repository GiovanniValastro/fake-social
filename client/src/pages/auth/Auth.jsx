import React, { useState } from 'react';
import { Box, Tab, Container } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { AuthForm } from './AuthForm';

export const Auth = () => {
 
  const [tab, setTab] = useState('signUp');

  return (
    <Container fixed>
      <Box typography='body1' bgcolor='background.primary' borderRadius={2} width='100%' maxWidth={350} minHeight={520} mb={50} boxShadow={3}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={(e, newTab) => setTab(newTab)}>
              <Tab label='Sign up' value='signUp' />
              <Tab label='Sign in' value='signIn' />
            </TabList>
          </Box>
          <TabPanel value='signUp' children={<AuthForm tab={tab} />} />
          <TabPanel value='signIn' children={<AuthForm tab={tab} />} />            
        </TabContext>
      </Box>
    </Container>
  );
}