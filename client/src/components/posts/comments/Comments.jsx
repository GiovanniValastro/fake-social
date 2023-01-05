import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { Comment } from './Comment';

export const CommentsList = ({post, postId}) => {
  
  const [comments, setComments] = useState([]);
  const [replyComments, setReplyComments] = useState([]);

  useEffect(() => {
    const newCm = post.filter(cm => !cm.replyComment)
    setComments(newCm)
  },[post])

  useEffect(()=> {
    const newRep = post.filter(cm => cm.replyComment)
    setReplyComments(newRep)
  }, [post])

  return(
    <>
      {
        comments.map((comment, index) => (
          <Comments
            key={index}  
            comments={comment}
            postId={postId}
            replyCm={replyComments.filter(item => item.replyComment === comment._id ) }
           />
         ))
        }
    </>
  )
}

const Comments = ({comments, postId, replyCm}) => {

  return(
    <Comment
      creator={comments.creator}
      text={comments.text} 
      createdAt={comments.createdAt} 
      id={comments._id} 
      likes={comments.likes}
      postId={postId}
    >
      <Box ml={5}>
        { replyCm.map((item, index) =>
          <Comment    
            replyUser={item.replyUser}
            replyComment={item.replyComment}
            key={index} 
            creator={item.creator}
            text={item.text} 
            createdAt={item.createdAt} 
            id={item._id} 
            likes={item.likes}
            postId={postId} 
          />
        )}
      </Box>  
    </Comment>     
  )  
}