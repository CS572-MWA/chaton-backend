var express = require('express');
var router = express.Router();
const userController = require('./../controllers/user');

router.route('/')
  .get(userController.getUsers)
  .post(userController.addUser);

router.route('/:id')
  .get(userController.updateUser)
  .delete(userController.deleteUser)
  .put(userController.updateUser);

module.exports = router;