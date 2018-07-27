const { User } = require('../models');

const index = async (req, res) => {
  const users = await User.findAll();

  res.render('index', { users });
};

module.exports = {
  index,
};
