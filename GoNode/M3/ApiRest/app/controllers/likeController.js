const mongoose = require('mongoose');

const Tweet = mongoose.model('Tweet');

const toggle = async (req, res, next) => {
  try {
    const {
      tweetId,
    } = req.params;

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return res.status(400).json({
        error: 'Tweet doesn\'t exist',
      });
    }

    const liked = tweet.likes.indexOf(req.userId);

    if (liked === -1) {
      tweet.likes.push(req.userId);
    } else {
      tweet.likes.splice(liked, 1);
    }

    await tweet.save();

    return res.json(tweet);
  } catch (err) {
    return next(err);
  }
};
module.exports = {
  toggle,
};
