const mongoose = require('mongoose');
const Comment = require('../model/Comment');
const Posts = require('../model/Posts');

const createComment = async (req, res) => {
  const { text, postId, replyComment, replyUser, replyUsername } = req.body;
  try{
    const post = await Posts.findById(postId);
    if(!post) return res.status(400).json({message: 'No posts found'})
    if(replyComment) {
      const comment = Comment.findById(replyComment)
      if(!comment) return res.status(404).json({message: 'No comments found'})
    }
    const newComment = new Comment({text, creator: req.creator._id, replyComment, replyUser, postId, createdAt: new Date().toISOString()}); 
    await Posts.findByIdAndUpdate({_id: postId}, {
      $push: {comments: newComment._id}}, { new: true})
    await newComment.save();
    res.status(200).json({...newComment._doc, creator: req.creator, replyUser: {_id: replyUser, username: replyUsername}});
  }catch(error){
    res.status(400).json({message: error.message});
  }
} 

const updateComment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Comment with ${id}`);
  try{
    const updateComment = await Comment.findByIdAndUpdate(id, { text: req.body.text }, { new: true } ).populate('replyUser', 'username');
    res.status(200).json({...updateComment._doc, creator: req.creator})
  }catch(error){
    res.status(404).json({message: error.message});
  }
}

const deleteComment = async (req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Comment with ${id}`);

  try{
    const { postId } = await Comment.findByIdAndDelete(id)
    res.status(200).json({ id, postId })
  }catch(error){
    res.status(404).json({message: error.message});
  }
}

const likeComment = async (req, res) => {
  const { id } = req.params;
  try{
    if(!req.creator._id) return res.status(400).json({message: 'Unauthenticated'})
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Comment with ${id}`);
    const comment = await Comment.findById(id);
    const index = comment.likes.findIndex(id => id === String(req.creator._id));
    if(index === -1) {
      comment.likes.push(req.creator._id);
    }else{
      comment.likes = comment.likes.filter(id => id !== String(req.creator._id))
    }
    const updateComment = await Comment.findByIdAndUpdate( id, comment, { new: true}).populate('creator', 'username avatar friends city');
    res.status(200).json(updateComment);  
  } catch(error) {
    res.status(400).json({message: error.message})
  }
}

module.exports = { createComment, updateComment, deleteComment, likeComment };