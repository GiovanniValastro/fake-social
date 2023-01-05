const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  creator: { type: mongoose.Types.ObjectId, ref: 'user'},
  text: String,
  tags:  [{ type:String, trim: true }],
  images: {type: Array, default: []},
  likes: { type: [String], default: [] },
  comments: [{ type: mongoose.Types.ObjectId, ref: 'comments' }],
  createdAt: { type: Date, default: new Date() }
});

module.exports = mongoose.model('Post', postSchema);