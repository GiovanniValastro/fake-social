import { createSlice } from '@reduxjs/toolkit';
import { getPosts, getPost, getPostByCreator,getPostByLikes, createPost, updatePost, deletePost, likePost, getPostByTag } from './postActions';
import { createComment, likeComment, deleteComment, updateComment } from './commentActions';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: null,
    error: null,
  },
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.loading = true  
    },
    [getPosts.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.posts = payload
    },
    [getPosts.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },

    [getPost.pending]: (state) => {
      state.loading = true  
    },
    [getPost.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.posts = payload
    },
    [getPost.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },

    [getPostByCreator.pending]: (state) => {
      state.loading = true  
    },
    [getPostByCreator.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.posts = payload
    },
    [getPostByCreator.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },

    [getPostByLikes.pending]: (state) => {
      state.loading = true  
    },
    [getPostByLikes.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.posts = payload
    },
    [getPostByLikes.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },

    [getPostByTag.pending]: (state) => {
      state.loading = true  
    },
    [getPostByTag.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.posts = payload
    },
    [getPostByTag.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },

    [createPost.fulfilled]: (state, { payload }) => {
      state.posts = [...state.posts, payload]  
    },
    [createPost.rejected]: (state, { payload }) => {
      state.error = payload.message
    },

    [updatePost.fulfilled]: (state, {payload}) => {
      state.posts = state.posts.map(post => (post._id === payload._id ? payload : post))
    },
    [updatePost.rejected]: (state, {payload}) => {
      state.error = payload.message
    },

    [likePost.fulfilled]: (state, {payload}) => {
      if(Array.isArray(state.posts)) {
      state.posts = state.posts.map(post => (post._id === payload._id ? payload : post))
      }else{
        state.posts = payload
      }
    },
    [likePost.rejected]: (state, {payload}) => {
      state.error = payload.message
    },

    [deletePost.fulfilled]: (state, {payload}) => {
      state.posts = state.posts.filter(post => post._id !== payload)
    },
    [deletePost.error]: (state, {payload}) => {
      state.error = payload.message
    },

    [createComment.fulfilled]: (state, { payload }) => {
      if(Array.isArray(state.posts)) {
        state.posts = state.posts.map(post => (post._id === payload.postId ?
        post = {...post, comments: [...post.comments, payload ]} : post))
      } else {
        state.posts = {...state.posts, comments: [...state.posts.comments, payload ]}
      }
    },
    [createComment.rejected]: (state, { payload }) => {
      state.error = payload.message
    },

    [updateComment.fulfilled]: (state, {payload}) => {
      if(Array.isArray(state.posts)) {
        state.posts = state.posts.map(post => (post._id === payload.postId ?
        post = {...post, comments: post.comments.map(comment => comment._id === payload._id ? payload : comment)} : post
      ))
      } else {
        state.posts = {...state.posts, comments: state.posts.comments.map(comment => comment._id === payload._id ? payload : comment)}
      }
    },
    [updateComment.rejected]: (state, {payload}) => {
      state.error = payload.message
    },

    [likeComment.fulfilled]: (state, {payload}) => {
      if(Array.isArray(state.posts)) {
        state.posts = state.posts.map(post => (post._id === payload.postId ?
        post = {...post, comments: post.comments.map(comment => comment._id === payload._id ? payload : comment)} : post
      ))
      } else {
        state.posts = {...state.posts, comments: state.posts.comments.map(comment => comment._id === payload._id ? payload : comment)}
      }
    },
    [likePost.rejected]: (state, {payload}) => {
      state.error = payload.message
    },

    [deleteComment.fulfilled]: (state, {payload}) => {
      if(Array.isArray(state.posts)) {
      state.posts = state.posts.map(post => (post._id === payload.postId ?
        post = {...post, comments: post.comments.filter(comment => comment._id !== payload.id)} : post
      ))  
      }else{
        state.posts = {...state.posts, comments: state.posts.comments.filter(comment => comment._id !== payload.id)}   
      }
    },
    [deleteComment.error]: (state, {payload}) => {
      state.error = payload.message
    },
  },
});

export default postsSlice.reducer;

