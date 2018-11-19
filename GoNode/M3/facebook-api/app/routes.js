const express = require('express');
const requireDir = require('require-dir');

const controllers = requireDir('./controllers');
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

/**
 * Auth
 */
routes.post('/signup', controllers.authController.signup);
routes.post('/signin', controllers.authController.signin);

/**
 * Authenticated routes
 */

routes.use(authMiddleware.auth);

routes.get('/status', (req, res, next) => {
  try {
    return res.send('API UP');
  } catch (err) {
    return next(err);
  }
});

module.exports = routes;
