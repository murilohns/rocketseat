const express = require('express');

const userController = require('../app/controllers/userController');
const projectController = require('../app/controllers/projectController');
const sectionController = require('../app/controllers/sectionController');

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

/**
 * Projects
 */
routes.get('/projects', projectController.index);
routes.get('/projects/:id', projectController.index);
routes.post('/projects/create', projectController.store);

/**
 * Sections
 */
routes.get('/projects/:projectId/sections', sectionController.index);
routes.get('/projects/:projectId/sections/:sectionId', projectController.index);
routes.post('/projects/:projectId/sections/create', sectionController.store);

module.exports = routes;
