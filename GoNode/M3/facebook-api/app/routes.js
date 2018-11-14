const express = require('express');
const requireDir = require('require-dir');

const controllers = requireDir('./controllers');

const routes = express.Router();

routes.post('/signup', controllers.authController.signup);
routes.get('/status', (req, res, next) => {
  try {
    return res.send('API UP');
  } catch (err) {
    return next(err);
  }
});

module.exports = routes;
