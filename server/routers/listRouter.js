const express = require('express');
const listRouter = express.Router();
const listControllers = require('../controllers/listControllers.js');

listRouter.route('/')
  .post(listControllers.addList)
  .get(listControllers.getList)
  .put(listControllers.updateList)
  .delete(listControllers.deleteList)

listRouter.get('/all', listControllers.getLists);

module.exports = listRouter;