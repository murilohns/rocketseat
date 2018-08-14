const express = require('express');

const userController = require('../app/controllers/userController');

const routes = express.Router();

/**
 * Auth
 */

routes.get('/', userController.signin);
routes.get('/signin', userController.signin);
routes.get('/signup', userController.signup);

routes.post('/authenticate', userController.authenticate);
routes.post('/register', userController.register);

module.exports = routes;
