const bcrypt = require('bcryptjs');
const { User } = require('../models');

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

const authenticate = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.redirect('back');
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.redirect('back');
  }

  return res.redirect('/dashboard');
};

module.exports = {
  authenticate,
  register,
  signin,
  signup,
};
