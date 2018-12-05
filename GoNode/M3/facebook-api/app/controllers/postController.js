const mongoose = require('mongoose');

const Post = mongoose.model('Post');

const create = async (req, res, next) => {
  try {
    const { content } = req.body;

    const post = await Post.create({
      content,
      user: req.userId,
    });

    return res.send(post);
  } catch (err) {
    return next(err);
  }
};

const show = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    return res.send(post);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  create,
  show,
};
