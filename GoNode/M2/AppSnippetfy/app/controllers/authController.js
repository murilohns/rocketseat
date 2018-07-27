const signin = (req, res) => res.render('auth/signin');
const signup = (req, res) => res.render('auth/signup');

module.exports = {
  signin,
  signup,
};
