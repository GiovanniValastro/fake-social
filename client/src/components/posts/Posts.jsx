import React from 'react';
import { Post } from './Post';
import { useSelector } from 'react-redux';
import { Loader } from '../Loader';

export const  Posts = () => {
  
  const { posts } = useSelector(state => state.posts)

  return(
    <>
      { Array.isArray(posts) ?  
        [...posts].reverse().map((post, index) => (
          <Post
            key={index}
            id={post._id}
            text={post.text}  
            creator={post.creator}
            createdAt={post.createdAt}
            likes={post.likes}  
            comments={post.comments} 
            tags={post.tags}
            selectedFile={post.images}  
          />
        ) 
        ) : <Loader />
      } 
    </>
  )
}