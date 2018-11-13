require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PrettyError = require('pretty-error');

const prettyError = new PrettyError();

mongoose.connect(process.env.DATABASE_URL);
app.use(bodyParser.json());
app.use('/api', require('./app/routes'));

app.use((err, req, res, next) => console.log(prettyError.render(err)));

prettyError.skipNodeFiles();
prettyError.skipPackage('express');
app.listen(3000);
