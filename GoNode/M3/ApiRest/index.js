const app = require('express')();
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const bodyParser = require('body-parser');
const Sentry = require('@sentry/node');
const dbConfig = require('./config/database');
const sentryConfig = require('./config/sentry');

Sentry.init({ dsn: sentryConfig.sentryDSN });

mongoose.connect(dbConfig.url);

requireDir(dbConfig.modelsPath);
app.use(bodyParser.json());

app.use(Sentry.Handlers.requestHandler());

app.use('/api', require('./app/routes'));

app.use(Sentry.Handlers.errorHandler());
app.listen(3000);
