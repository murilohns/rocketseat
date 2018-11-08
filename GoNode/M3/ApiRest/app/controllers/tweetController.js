const mongoose = require('mongoose');

const Tweet = mongoose.model('Tweet');

const create = async (req, res, next) => {
  try {
    const tweet = await Tweet.create({
      ...req.body,
      user: req.userId,
    });

    return res.json(tweet);
  } catch (err) {
    return next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await Tweet.findByIdAndRemove(req.params.id);

    return res.send();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  create,
  destroy,
};
