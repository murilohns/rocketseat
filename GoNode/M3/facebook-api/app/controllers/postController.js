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
    const { postId } = req.params;

    const post = await Post.findById(postId);

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
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        error: 'Publicação não encontrada',
      });
    }

    const liked = indexOf(req.userId, post.likes);

    if (liked !== -1) {
      post.likes.splice(liked);
    } else {
      post.likes.push(req.userId);
    }

    await post.save();

    return res.json(post);
  } catch (err) {
    return next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        error: 'Publicação não encontrada',
      });
    }

    if (post.user.toString() !== req.userId) {
      return res.status(400).json({
        error: 'Você não pode deletar essa publicação',
      });
    }

    const removedPost = await Post.findByIdAndRemove(postId);

    return res.json(removedPost);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  create,
  destroy,
  like,
  show,
};
