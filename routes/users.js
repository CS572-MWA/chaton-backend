var express = require('express');
var router = express.Router();

const userController = require('./../controllers/user');
const userMiddleware = require('./../middleware/user');
const authMiddleware = require('./../middleware/auth');

router.route('/')
  .get(authMiddleware.checkedAuth,userController.getUsers)
  .post(userMiddleware.addUser,
    userController.addUser)
  .put(authMiddleware.checkedAuth, userMiddleware.updateUser,
    userController.updateUser);

router.route('/:id')
  .get(authMiddleware.checkedAuth, userController.getUser)
  .delete(authMiddleware.checkedAuth, userController.deleteUser)
  
router.route('/login')
  .post(userMiddleware.login,
    userController.login)

module.exports = router;