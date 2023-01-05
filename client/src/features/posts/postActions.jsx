import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { UploadImage } from '../../utils/UploadImage';

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async() => {
    try{
      const { data } = await api.fetchPosts();
      return data
    }catch(error){
      console.log(error)
    } 
  } 
)

export const getPost = createAsyncThunk(
  'post/getPost',
  async(id) => {
    try{
      const { data } = await api.fetchPost(id)
      return data
    }catch(error){
      console.log(error)
    } 
  }
)

export const getPostByCreator = createAsyncThunk(
  'posts/getPostByCreator',
  async(id) => {
    try{
      const { data } = await api.fetchPostByCreator(id)
      return data
    }catch(error){
      console.log(error)
    } 
  }
)

export const getPostByLikes = createAsyncThunk(
  'posts/getPostByLikes',
  async(id) => {
    try{
      const { data } = await api.fetchPostByLike(id)    
      return data
    }catch(error){
      console.log(error)
    } 
  }
)

export const getPostByTag = createAsyncThunk(
  'posts/getPostByTag',
  async(tag) => {
    try{
      const { data } = await api.fetchPostByTag(tag)    
      return data
    }catch(error){
      console.log(error)
    } 
  }
)

export const createPost = createAsyncThunk(
  'post/createtPost',
  async({text, tags, images }) => {
    let media = [];
    try{
      if(images.length > 0) media = await UploadImage(images)
      const { data } = await api.createPost({text, tags, images: media})
      return data
    }catch(error){
      console.log(error)
    }
  }  
)

export const updatePost = createAsyncThunk(
  'post/updatePost',
  async({ text, tags, images, id }) => {
    let media = []   
    const oldImg = images.filter(img => img.url)
    const newImg = images.filter(img => !img.url)
    try{
      if(newImg.length > 0) media = await UploadImage(newImg)
      const { data } = await api.updatePost({id, post: { text, tags, images:[...oldImg, ...media] }})
      return data
    }catch(error){
      console.log(error)
    } 
  }
)

export const likePost = createAsyncThunk(
  'post/likePost',
  async({id, socket}) => {
    try{
      if(typeof id !== 'string') return id
      const { data } = await api.likePost(id)   
      socket.emit('likePost', data)
      return data
    }catch(error){
      console.log(error)
    } 
  }
)

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async(id) => {
    try{
      const { data } = await api.deletePost(id)
      return data
    }catch(error){
      console.log(error)
    } 
  }
)