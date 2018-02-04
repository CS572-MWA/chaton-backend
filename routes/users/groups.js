var express = require('express');
var router = express.Router();

const userController = require('./../../controllers/user/group');
const authMiddleware = require('./../../middleware/auth');

router.route('/groups/')
  .get(authMiddleware.checkedAuth,
    userController.getGroups)

router.route('/groups/:id')
  .put(authMiddleware.checkedAuth,
    userController.addUserForGroup)

module.exports = router;