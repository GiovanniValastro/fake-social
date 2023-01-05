const Message = require('../model/Message');

const getMessages = async (req, res) => {
  try{
    const { user } = req.query;
      const messages = await Message.find({ 
      $or: [ { $and: [{ sender: req.creator._id }, { recipient: user }] }, { $and: [{ sender: user }, { recipient: req.creator._id }] }] 
    })
    res.status(200).json(messages);
  }catch(error){
    res.status(404).json({message: error.message})
  }  
} 

const createMessage = async (req, res) => {
  const newMessage = new Message({...req.body, sender: req.creator._id, createdAt: new Date().toISOString() }); 
   try{
    await newMessage.save()
    res.status(200).json(newMessage);
  }catch(error){
    res.status(404).json({message: error.message})
  }  
}

const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try{
    await Message.findByIdAndDelete(id);
    res.status(200).json(id)
  }catch(error){
    res.status(404).json({message: error.message})
  }  
}

module.exports = { getMessages, createMessage, deleteMessage };