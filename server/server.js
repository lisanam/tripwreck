//Server setup
const express = require('express');
const app = express();

const path = require('path');

//Environment variables
require('dotenv').config();

//Database setup
var db  = require('../database/db');
// const db = require('../database/utiles.js');
// db.initialisation();
// app.set('db', db);

//Middleware setup
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Serve static files and node modules
// app.use('/scripts', express.static(path.join(__dirname, '..', 'mobile/node_modules')))
// app.use(express.static(path.join(__dirname, '..', 'public')));

//Routers
// const listRouter = require('./routers/listRouter.js');
// app.use('/list', listRouter);

//Serve index.html at every other route that comes to server
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public/index'));
});

app.listen(4567, function () {
  console.log('TripWreck is running on port 4567!');
});

module.exports = app;