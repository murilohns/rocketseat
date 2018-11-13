require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);
app.use(bodyParser.json());
app.use('/api', require('./app/routes'));

app.listen(3000);
