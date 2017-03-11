//Server setup
const express = require('express');
const app = express();

const path = require('path');

//Environment variables
require('dotenv').config();

//Database setup
const db = require('../database/db.js');
app.set('bookshelf', db);

//Middleware and Authentication setup
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

//Serve static files and node modules
app.use('/scripts', express.static(path.join(__dirname, '..', 'mobile/node_modules')))
app.use(express.static(path.join(__dirname, '..', 'public')));

//Routers
const listRouter = require('./routers/listRouter.js');
app.use('/list', listRouter);

//Serve index.html at every other route that comes to server
// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, '..', 'mobile/index'));
// });

app.listen(8080, function () {
  console.log('TripWreck is running on port 8080!');
});

module.exports = app;