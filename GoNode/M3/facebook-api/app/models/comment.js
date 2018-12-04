const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 280,
  },
  User: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: true,
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    require: true,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model('Comment', CommentSchema);
