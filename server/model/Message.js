const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  text: { type: String, required: true },
  images: {type: Array, default: []},
  recipient: { type: mongoose.Types.ObjectId, ref: 'user'},
  sender: { type: mongoose.Types.ObjectId, ref: 'user'},
  createdAt: { type: Date, default: new Date() }
});

module.exports = mongoose.model('message', messageSchema);