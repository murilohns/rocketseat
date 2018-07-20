const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');
const moment = require('moment');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

const hasName = (req, res, next) => {
  if (req.query.name) {
    next();
    return;
  }

  res.redirect('/');
};

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.get('/', (req, res) => {
  res.render('main', {});
});

app.get('/minor', hasName, (req, res) => {
  const { name } = req.query;
  res.render('minor', { name });
});

app.get('/major', hasName, (req, res) => {
  const { name } = req.query;
  res.render('major', { name });
});

app.post('/check', (req, res) => {
  const now = moment();
  const birthday = req.body.birthday;

  const age = now.diff(birthday, 'years');

  if (age >= 18) {
    res.redirect(`/major?name=${req.body.name}`);
  } else {
    res.redirect(`/minor?name=${req.body.name}`);
  }
});

app.listen(3000);
