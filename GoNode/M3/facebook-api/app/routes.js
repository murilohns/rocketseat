const express = require('express');

const routes = express.Router();

routes.get('/status', (req, res) => res.send('API Up'));

module.exports = routes;
