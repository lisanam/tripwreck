const express = require('express');
const userRouter = express.Router();
const userControllers = require('../controllers/userControllers.js');

userRouter.route('/')
  .post(userControllers.addUser)
  .get(userControllers.getUser)
  .put(userControllers.updateUser)
  .delete(userControllers.deleteUser);

module.exports = userRouter;