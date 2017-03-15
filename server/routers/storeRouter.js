const express = require('express');
const storeRouter = express.Router();
const storeControllers = require('../controllers/storeControllers.js');

storeRouter.get('/search', storeControllers.getSearchResults);
storeRouter.get('/reviews', storeControllers.getReviews);

module.exports = storeRouter;