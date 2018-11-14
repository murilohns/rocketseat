require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const PrettyError = require('pretty-error');
const dbConfig = require('./config/database');

const prettyError = new PrettyError();

requireDir(dbConfig.modelsPath);
mongoose.connect(process.env.DATABASE_URL);
app.use(bodyParser.json());
app.use('/api', require('./app/routes'));

app.use((err, req, res, next) => {
  console.log(prettyError.render(err));
  return res.status(400).json({
    error: err.message,
  });
});

prettyError.skipNodeFiles();
prettyError.skipPackage('express');
app.listen(3000);
