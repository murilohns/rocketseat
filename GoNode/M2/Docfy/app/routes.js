const express = require('express');

const userController = require('../app/controllers/userController');

const routes = express.Router();

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

/**
 * Auth
 */

routes.get('/', userController.signin);
routes.get('/signin', userController.signin);
routes.get('/signup', userController.signup);

routes.post('/authenticate', userController.authenticate);
routes.post('/register', userController.register);

module.exports = routes;
