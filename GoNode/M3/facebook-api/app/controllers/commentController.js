const mongoose = require('mongoose');

const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');

const create = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        error: 'Post não encontrado',
      });
    }

    const comment = await Comment.create({
      content,
      post: post.id,
    });

    post.comments.push(comment.id);

    post.save();
    return res.json(comment);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  create,
};
