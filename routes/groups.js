var express = require('express');
var router = express.Router();

const groupController = require('./../controllers/group');
const authMiddleware = require('./../middleware/auth');

router.route('/')
  .get(authMiddleware.checkedAuth,
    groupController.getGroups)
  .post(groupController.addGroup);

router.route('/:id')
  .put(authMiddleware.checkedAuth,
    groupController.addUserForGroup)

router.route('/:id/:user_id')
  .delete(authMiddleware.checkedAuth, 
    groupController.removeUserForGroup);

module.exports = router;