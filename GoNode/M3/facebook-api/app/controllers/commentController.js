const mongoose = require('mongoose');
const { indexOf } = require('ramda');

const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');

const create = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        error: 'Publicação não encontrada',
      });
    }

    const comment = await Comment.create({
      content,
      post: post.id,
      user: req.userId,
    });

    post.comments.push(comment.id);

    post.save();
    return res.json(comment);
  } catch (err) {
    return next(err);
  }
};

const like = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        error: 'Post não encontrado',
      });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        error: 'Post não encontrado',
      });
    }

    const liked = indexOf(req.userId, comment.likes) !== -1;

    if (liked) {
      comment.likes.pop(liked);
    } else {
      comment.likes.push(req.userId);
    }

    await comment.save();

    return res.json(comment);
  } catch (err) {
    return next(err);
  }
};

const show = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        error: 'Post não encontrado',
      });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        error: 'Post não encontrado',
      });
    }

    if (comment.user) { await comment.findByIdAndRemove(commentId); }

    return res.json(comment);
  } catch (err) {
    return next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        error: 'Publicação não encontrada',
      });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        error: 'Publicação não encontrada',
      });
    }

    if (
      comment.user.toString() !== req.userId
      || post.user.toString() !== req.userId
    ) {
      return res.status(400).json({
        error: 'Você não pode deletar essa publicação',
      });
    }

    const removedComment = await Comment.findByIdAndRemove(commentId);

    return res.json(removedComment);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  destroy,
  like,
  create,
  show,
};
