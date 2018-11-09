const express = require('express');
const requireDir = require('require-dir');

const routes = express.Router();
const authMiddleware = require('./middlewares/auth');

const controllers = requireDir('./controllers');

/**
 * Auth
 */
routes.post('/signup', controllers.authController.signup);
routes.post('/signin', controllers.authController.signin);

/**
 * ========
 * Authenticated routes
 */
routes.use(authMiddleware.auth);

/**
 * Tweets
 */
routes.post('/tweets', controllers.tweetController.create);
routes.delete('/tweets/:id', controllers.tweetController.destroy);

/**
 * Users
 */
routes.put('/users', controllers.userController.update);

/**
 * Follows
 */
routes.post('/follow/:userId', controllers.followController.create);
routes.delete('/unfollow/:userId', controllers.followController.destroy);

/**
 * Likes
 */
routes.post('/like/:tweetId', controllers.likeController.toggle);
module.exports = routes;
