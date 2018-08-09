const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const routes = require('./app/routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve('app', 'public')));

nunjucks.configure(path.resolve('app', 'views'), {
  autoscape: true,
  express: app,
});

app.use('/', routes);

app.listen(3000);
