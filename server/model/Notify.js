const mongoose = require('mongoose');

const notifySchema = mongoose.Schema({
  recipients: String,
  sender: { type: mongoose.Types.ObjectId, ref: 'user'},
  componentId: String,
  text: String,
  image: String,
  type: String,
  isRead: {type: Boolean, default: false},
  createdAt: { type: Date, default: new Date() }
});

module.exports = mongoose.model('notify', notifySchema);