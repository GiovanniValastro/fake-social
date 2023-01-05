const Notify = require('../model/Notify');

const getNotifications = async (req, res) => {
  try{
    const notify = await Notify.find({ recipients: req.creator._id }).populate('sender', 'username avatar');
    res.status(200).json(notify)
  }catch(error){
    res.status(404).json({message: error.message})
  }
}

const createNotification = async (req, res) => {
  const notify = req.body;
  const newNotify = new Notify({...notify, sender: req.creator._id, createdAt: new Date().toISOString()});
  try{
    await newNotify.save()
    res.status(200).json({...newNotify._doc, sender: req.creator}) 
  }catch(error){
    res.status(404).json({message: error.message})
  }
}

const updateNotification = async (req, res) => {
  try{
    const notify = await Notify.updateMany({ recipients: req.creator._id }, {$set:{ isRead: true } })
    res.status(200).json(notify)
  }catch(error){
    res.status(404).json({message: error.message})
  }  
}

const deleteNotification = async (req, res) => {
  const { id } = req.params;  
  try{
    await Notify.findByIdAndDelete(id)
    res.status(200).json(id)
  }catch(error){
    res.status(404).json({message: error.message}) 
  }
}

const deleteAllNotifications = async (req, res) => {
  try{
    const notify = await Notify.deleteMany({ recipients: req.creator._id })
    res.status(200).json(notify)
  }catch(error){
    res.status(404).json({message: error.message}) 
  }
}

module.exports = { getNotifications, createNotification, updateNotification, deleteNotification, deleteAllNotifications };