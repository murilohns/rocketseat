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

/**
 * Posts
 */
routes.post('/posts', controllers.postController.create);
routes.get('/posts/:postId', controllers.postController.show);
routes.post('/posts/:postId/like', controllers.postController.like);
routes.delete('/posts/:postId', controllers.postController.destroy);

/**
 * Comments
 */
routes.get('/posts/:postId/comments/:commentId', controllers.commentController.show);
routes.post('/posts/:postId/comments', controllers.commentController.create);
routes.post('/posts/:postId/comments/:commentId/like', controllers.commentController.like);
routes.delete('/posts/:postId/comments/:commentId', controllers.commentController.destroy);

/**
 * Users (feed and update)
 */
routes.get('/users/self', controllers.userController.self);
routes.get('/users/self/update', controllers.userController.update);
routes.get('/users/feed', controllers.userController.feed);
routes.get('/users/:id', controllers.userController.show);

/**
 * Friends
 */
routes.post('/users/:id/friendship', controllers.friendController.addFriend);
routes.delete('/users/:id/friendship', controllers.friendController.deleteFriend);

routes.get('/status', (req, res, next) => {
  try {
    return res.send('API UP');
  } catch (err) {
    return next(err);
  }
});

routes.use((req, res) => res.status(404).json({
  error: 'Rota não encontrada',
}));

module.exports = routes;
