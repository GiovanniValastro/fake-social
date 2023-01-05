const mongoose = require('mongoose');
const Post = require('../model/Posts');

const getPosts = async (req, res) => {
  try{
    const posts = await Post.find()
      .populate('creator', 'username avatar friends city')
      .populate({path: 'comments', populate: [{path: 'creator', select: 'username avatar friends city'}, {path: 'replyUser', select: 'username'}]});
    res.status(200).json(posts)
  }catch(error){
    res.status(404).json({message: error.message});
  }
}

const getPost = async (req, res) => {
  const { id } = req.params;
  try{
    const post = await Post.findById(id)
      .populate('creator', 'username avatar friends city')
      .populate({path: 'comments', populate: [{path: 'creator', select: 'username avatar friends city'}, {path: 'replyUser', select: 'username'}]});                                   
    res.status(200).json(post)
  } catch(error){
    res.status(400).json({message: error.message})
  }
}

const getPostByCreator = async (req, res) => {
  const { creator } = req.query;
  try{
    const posts = await Post.find({ creator })
      .populate('creator', 'username avatar friends city')
      .populate({path: 'comments', populate: [{path: 'creator', select: 'username avatar friends city' }, {path: 'replyUser', select: 'username'}]});;
    res.status(200).json(posts)
  }catch(error){
    res.status(400).json({message: error.message})
  }
}

const getPostByTags = async (req, res) => {
  const { tag } = req.query;
  try{
    const posts = await Post.find({ tags: { "$in" : [tag]} })
      .populate('creator', 'username avatar friends city')
      .populate({path: 'comments', populate: [ {path: 'creator', select: 'username avatar friends city'}, {path: 'replyUser', select: 'username'}]});;
    res.status(200).json(posts)
  }catch(error){
    res.status(400).json({message: error.message})
  }
}

const getPostsByLike = async (req, res) => { 
  const { user } = req.query;
  try{
    const posts = await Post.find({ likes: { $all : [user]} })
      .populate('creator', 'username avatar friends city')
      .populate({path: 'comments', populate: [{path: 'creator', select: 'username avatar friends city' }, {path: 'replyUser', select: 'username'}]});;
    res.status(200).json(posts)
  }catch(error){
    res.status(400).json({message: error.message})
  }
}     

const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post({...post, creator: req.creator._id}); 
  try{
    await newPost.save();
    res.status(200).json({...newPost._doc, creator: req.creator});
  }catch(error){
    res.status(404).json({message: error.message});
  }
} 

const updatePost = async (req, res) => {
  const { id } = req.params;
  try{
    const updatePost = await Post.findByIdAndUpdate(id, req.body, { new: true } )
      .populate({path: 'comments', populate: {path: 'creator', select: 'username avatar' }});
    res.status(200).json({...updatePost._doc, creator: req.creator})
  }catch(error){
    res.status(404).json({message: error.message});
  }
}

const deletePost = async (req, res) => {
  const { id } = req.params;
  try{
    await Post.findByIdAndDelete(id)
    res.status(200).json(id)
  }catch(error){
    res.status(404).json({message: error.message});
  }
}

const likePost = async (req, res) => {
  const { id } = req.params;
  try{
    if(!req.creator._id) return res.status(400).json({message: 'Unauthenticated'})
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with ${id}`);
    const post = await Post.findById(id);
    post.likes.includes(req.creator._id) ?   
      post.likes = post.likes.filter(id => id !== String(req.creator._id)) :
      post.likes.push(req.creator._id);
    const updatePost = await Post.findByIdAndUpdate( id, post, { new: true}).populate('creator', '_id username friends avatar')
      .populate({path: 'comments', populate: {path: 'creator', select: 'username avatar' }});
    res.status(200).json(updatePost);  
  } catch(error) {
    res.status(400).json({message: error.message})
  }
}

module.exports = { getPosts, getPost, getPostByCreator, getPostsByLike, getPostByTags, createPost, updatePost, deletePost, likePost };