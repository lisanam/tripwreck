const express = require('express');
const listRouter = express.Router();
const listControllers = require('../controllers/listControllers.js');

listRouter.route('/')
  .post(listControllers.addList)
  .get(listControllers.getLists)
  .put(listControllers.updateList)
  .delete(listControllers.deleteList)

listRouter.post('/send', listControllers.sendList)

module.exports = listRouter;