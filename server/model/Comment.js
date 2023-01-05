const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
  creator: { type: mongoose.Types.ObjectId, ref: 'user'},
  text: { type: String, require: true },
  postId: String,
  replyComment: mongoose.Types.ObjectId,
  replyUser: { type: mongoose.Types.ObjectId, ref: 'user'},
  likes: { type: [String], default: [] },
  createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model('comments', commentsSchema);

