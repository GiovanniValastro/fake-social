import React, { useState } from 'react';
import { IconButton, Menu, Grid } from '@mui/material';
import { Share } from '@mui/icons-material';
import { 
  EmailShareButton, EmailIcon,
  WhatsappShareButton, WhatsappIcon, 
  FacebookShareButton, FacebookIcon, 
  TelegramShareButton, TelegramIcon, 
  TwitterShareButton, TwitterIcon,
  RedditShareButton, RedditIcon
  } from 'react-share';

export const Shared = ({url}) => {
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return(
    <>
      <IconButton children={<Share  />} onClick={e => setAnchorEl(e.currentTarget)} />        
      <Menu
        disableScrollLock
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <Grid container spacing={2} padding={1}>
          <Grid item>
            <WhatsappShareButton url={url}>
              <WhatsappIcon round={true} size={32}/>
            </WhatsappShareButton>
          </Grid>
          <Grid item>
            <FacebookShareButton url={url}>
              <FacebookIcon round={true} size={32}/>
            </FacebookShareButton> 
          </Grid> 
          <Grid item>
            <TelegramShareButton url={url}>
              <TelegramIcon round={true} size={32}/>
            </TelegramShareButton>
          </Grid>
          <Grid item>
            <TwitterShareButton url={url}>
              <TwitterIcon round={true} size={32}/>
            </TwitterShareButton> 
          </Grid>
          <Grid item>
            <EmailShareButton url={url} >
              <EmailIcon round={true} size={32} />
            </EmailShareButton>
          </Grid>
          <Grid item>
            <RedditShareButton url={url} >
              <RedditIcon round={true} size={32} />
            </RedditShareButton>
          </Grid>
        </Grid>
      </Menu>
    </>
  )  
}