import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom'; 
import { getPostByCreator } from '../../features/posts/postActions';

export const Foto = ({ setTab }) => {

  const { users } = useSelector(state => state.users);
  const { posts } = useSelector(state => state.posts);
  const { id } = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPostByCreator(id))
  },[dispatch, id])

  return(
    <>
      { users?._id === id ?   
        <Grid container spacing={1} xs={12} bgcolor='background.primary' borderRadius={1} minHeight={400}>
          { posts.map(post => (
            <>
              {post.images.map((image, index) => (
                <>
                  {  
                    post?.images[index]?.url && 
                    <Grid item component={Link} to={`/post/${post._id}`}>
                      <img 
                        style={{ width:'160px', heigth: '160px', borderRadius:'5px'}} 
                        src={image.url} 
                        alt="" 
                      />
                    </Grid> 
                  }
                </>
              ))}
            </>
          ))} 
        </Grid> : setTab('infUser')
      }
    </>
  )
}