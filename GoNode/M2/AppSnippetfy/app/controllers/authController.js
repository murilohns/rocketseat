const { User } = require('../models');
const bcrypt = require('bcryptjs');

const signin = (req, res) => res.render('auth/signin');
const signup = (req, res) => res.render('auth/signup');

const register = async (req, res) => {
  const { email } = req.body;

  if (await User.findOne({ where: { email } })) {
    return res.redirect('back');
  }

  const password = await bcrypt.hash(req.body.password, 5);

  await User.create({ ...req.body, password });

  return res.redirect('/');
};

module.exports = {
  signin,
  signup,
  register,
};
