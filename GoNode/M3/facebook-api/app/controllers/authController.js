const mongoose = require('mongoose');

const User = mongoose.model('User');

const signup = async (req, res, next) => {
  try {
    const {
      email, password, name, confirmPassword,
    } = req.body;

    if (!email) {
      return res.status(400).json({
        error: '"email" está faltando',
      });
    }

    if (!name) {
      return res.status(400).json({
        error: '"name" está faltando',
      });
    }

    if (!password) {
      return res.status(400).json({
        error: '"password" está faltando',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        error: '"confirmPassword" incorreto',
      });
    }

    if (
      await User.findOne({
        email,
      })
    ) {
      return res.status(400).json({
        error: 'Usuário já cadastrado',
      });
    }

    const user = await User.create(req.body);

    return res.json({
      user,
      token: user.generateToken(),
    });
  } catch (err) {
    return next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        error: '"email" está faltando',
      });
    }

    if (!password) {
      return res.status(400).json({
        error: '"password" está faltando',
      });
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        error: 'Usuário não encontrado',
      });
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({
        error: '"password" incorreta',
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
module.exports = {
  signup,
  signin,
};
