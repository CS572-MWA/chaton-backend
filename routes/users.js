var express = require('express');
var router = express.Router();

const userController = require('./../controllers/user');
const userMiddleware = require('./../middleware/user');

router.route('/')
  .get(userController.getUsers)
  .post(userMiddleware.addUser,
    userController.addUser);

router.route('/:id')
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .put(userMiddleware.updateUser,
    userController.updateUser);

router.route('/login')
  .post(userMiddleware.login,
    userController.login)

module.exports = router;