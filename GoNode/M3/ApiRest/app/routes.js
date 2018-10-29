const express = require('express');
const requireDir = require('require-dir');
const authController = require('./controllers/authController');

const routes = express.Router();
const controllers = requireDir('./controllers');

/**
 * Auth
 */
routes.post('/signup', controllers.authController.signup);

module.exports = routes;
