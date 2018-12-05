const mongoose = require('mongoose');
const { indexOf } = require('ramda');

const Post = mongoose.model('Post');

const create = async (req, res, next) => {
  try {
    const { content } = req.body;

    const post = await Post.create({
      content,
      user: req.userId,
    });

    return res.json(post);
  } catch (err) {
    return next(err);
  }
};

const show = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        error: 'Post não encontrado',
      });
    }

    return res.json(post);
  } catch (err) {
    return next(err);
  }
};

const like = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        error: 'Post não encontrado',
      });
    }

    const liked = indexOf(req.userId, post.likes) != -1;

    if (liked) {
      post.likes.pop(liked);
    } else {
      post.likes.push(req.userId);
    }

    await post.save();

    return res.json(post);
  } catch (err) {
    return next(err);
  }
};
module.exports = {
  create,
  like,
  show,
};
