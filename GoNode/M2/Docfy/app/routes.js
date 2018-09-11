const express = require('express');

const dashboardController = require('../app/controllers/dashboardController');
const userController = require('../app/controllers/userController');
const projectController = require('../app/controllers/projectController');
const sectionController = require('../app/controllers/sectionController');

const guestMiddleware = require('../app/middlewares/guest');
const authMiddleware = require('../app/middlewares/auth');

const routes = express.Router();

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

/**
 * Auth
 */

routes.get('/', guestMiddleware, userController.signin);
routes.get('/signin', guestMiddleware, userController.signin);
routes.get('/signup', guestMiddleware, userController.signup);
routes.get('/signout', userController.signout);

routes.post('/authenticate', userController.authenticate);
routes.post('/register', userController.register);

/**
 * Dashboard
 */
routes.use('/dashboard', authMiddleware);
routes.get('/dashboard', dashboardController.index);

/**
 * Projects
 */
routes.use('/projects', authMiddleware);
routes.get('/projects/:id', projectController.index);
routes.put('/projects/:id', projectController.update);
routes.delete('/projects/:id', projectController.destroy);
routes.post('/projects', projectController.store);

/**
 * Sections
 */
routes.get('/projects/:projectId/sections/:sectionId', sectionController.index);
routes.get('/projects/:projectId/sections', sectionController.createForm);
routes.post('/projects/:projectId/sections', sectionController.store);

routes.use((req, res) => res.render('errors/404'));

routes.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.render('errors/index', {
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
});

module.exports = routes;
