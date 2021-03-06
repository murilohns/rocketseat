const mongoose = require('mongoose');
const sendMail = require('../services/mailer');

const User = mongoose.model('User');

const signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      username,
    });

    if (!user) {
      return res.status(400).json({
        error: 'User not found',
      });
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({
        error: 'Invalid Password',
      });
    }

    return res.json({
      user,
      token: user.generateToken(),
    });
  } catch (err) {
    return next(err);
  }
};

const signup = async (req, res, next) => {
  try {
    const { email, username } = req.body;

    if (
      await User.findOne({
        $or: [
          {
            email,
          },
          {
            username,
          },
        ],
      })
    ) {
      return res.status(400).json({
        error: 'User already exists',
      });
    }

    const user = await User.create(req.body);

    sendMail({
      from: '"Murilo Souza" <murilohns@gmail.com>',
      to: user.email,
      subject: 'Bem vindo ao Tweetfy',
      template: 'auth/register',
      context: {
        name: user.name,
        username: user.username,
      },
    });

    return res.json({
      user,
      token: user.generateToken(),
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  signup,
  signin,
};
