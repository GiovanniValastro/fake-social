import React from 'react';
import { Dialog, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Form } from '../Form';

export const EditComponent = ({ onClose, open, dialog, id, text, img, tag }) => {

  return(
    <Dialog
      onClose={onClose} 
      maxWidth='xl' 
      open={open} 
      PaperProps={{ sx: { width:500, p:5, bgcolor: 'background.primary', position:'relative' }}}
    > 
      <IconButton children={<Close />} sx={{ position: 'absolute', right:1, top:0 }} onClick={onClose} />        
      {
        dialog === 'post' ?
          <Form label='Update post' form='updatePost' onClose={onClose} postId={id} title={text} tag={tag} img={img} /> :
          <Form label='Update comment' form='updateComment' onClose={onClose} commentId={id} title={text}/> 
      }
    </Dialog>
  )
}