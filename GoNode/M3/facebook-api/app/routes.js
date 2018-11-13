const express = require('express');

const routes = express.Router();

routes.get('/status', (req, res, next) => {
  try {
    return res.send('API UP');
  } catch (err) {
    return next(err);
  }
});

module.exports = routes;
