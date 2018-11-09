const mongoose = require('mongoose');

const User = mongoose.model('User');

const create = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(400).json({
        error: 'User does not exist',
      });
    }

    if (user.followers.indexOf(req.userId) !== -1) {
      return res.status(400).json({
        error: `You're already following ${user.username}`,
      });
    }

    user.followers.push(req.userId);

    await user.save();

    const loggedUser = await User.findById(req.userId);
    loggedUser.following.push(user.id);

    loggedUser.save();
    return res.json(loggedUser);
  } catch (err) {
    return next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(400).json({
        error: 'User does not exist',
      });
    }

    const following = user.followers.indexOf(req.userId);

    if (following === -1) {
      return res.status(400).json({
        error: `You're not following ${user.username}`,
      });
    }

    user.followers.splice(following, 1);
    await user.save();

    const loggedUser = await User.findById(req.userId);
    loggedUser.following.splice(loggedUser.following.indexOf(user.id), 1);

    loggedUser.save();
    return res.json(loggedUser);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  create,
  destroy,
};
