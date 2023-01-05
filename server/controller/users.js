const User = require('../model/User');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const getUser = async (req, res) => {
  try{
    const users = await User.findById(req.params.id).select('-password').populate('friends', 'username friends avatar');
    res.status(200).json(users);
  }catch(error){
    res.status(404).json({message: error.message});
  }  
}

const updateUser = async (req, res) => {
  try{
    const { username, avatar, email, password, gender, bio, city, dateOfBirth } = req.body;  
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const updateUser = await User.findByIdAndUpdate(req.params.id, { password: hashedPassword, avatar, username, email, gender, bio, city, dateOfBirth  }, { new: true })
    res.status(200).json(updateUser);
  }catch(error){
    res.status(404).json({message: error.message})
  }
}

const updateFriendsList = async (req, res) => {
  const { id } = req.params;
  try{
    const user = await User.findById(id);
    if (user.friends.includes(req.creator._id)) {
      let updateFriends = await User.findByIdAndUpdate( req.creator._id,{ $pull: { friends: mongoose.Types.ObjectId(id)}}, { new: true})
        .select('-password').populate('friends', 'username friends avatar')
      User.findByIdAndUpdate( id,{ $pull: { friends: mongoose.Types.ObjectId(req.creator._id)}}, { new: true})
      user.friends.pull(req.creator._id)
      await User.findByIdAndUpdate( id, user, { new: true})
      res.status(200).json(updateFriends);  
    } else {
      let updateFriends = await User.findByIdAndUpdate( req.creator._id,{ $push: { friends: mongoose.Types.ObjectId(id)}}, { new: true})
        .select('-password').populate('friends', 'username friends avatar')
      user.friends.push(req.creator._id)
      await User.findByIdAndUpdate( id, user, { new: true})
      res.status(200).json(updateFriends);  
    }
  } catch(error) {
    res.status(400).json({message: error.message})
  }
}

const deleteUser = async (req, res) => {
  try{
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json(req.params.id);
  }catch(error){
    res.status(404).json({message: error.message})
  }
}

module.exports = { getUser, updateUser, updateFriendsList, deleteUser }