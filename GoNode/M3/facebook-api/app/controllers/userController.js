const mongoose = require('mongoose');
const { indexOf } = require('ramda');

const User = mongoose.model('User');
const Post = mongoose.model('Post');

const self = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    return res.json({ user, posts: await Post.find({ user: req.userId }) });
  } catch (err) {
    return next(err);
  }
};

const show = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    return res.json({ user, posts: await Post.find({ user: id }) });
  } catch (err) {
    return next(err);
  }
};

const feed = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const posts = await Post.find({
      user: {
        $in: [req.userId, ...user.friends],
      },
    })
      .limit(50)
      .sort('-createdAt');

    return res.json(posts);
  } catch (err) {
    return next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { name, password, confirmPassword } = req.body;

    if (!name) {
      return res.status(400).json({ error: '"name" está faltando' });
    }

    if (password && password !== confirmPassword) {
      return res.status(400).json({ error: '"confirmPassword" está diferente de "password"' });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        name,
      },
      {
        new: true,
      },
    );

    if (password) {
      user.password = password;
      await user.save();
    }

    return res.json(user);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  feed,
  self,
  show,
  update,
};
