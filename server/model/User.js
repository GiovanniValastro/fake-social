const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  id: { type: String  },
  username: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  avatar: { type: String },
  gender: { type: String, },
  city: { type: String },
  dateOfBirth: { type: String },
  bio: { type: String },
  friends: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
})

module.exports = mongoose.model('user', userSchema)

