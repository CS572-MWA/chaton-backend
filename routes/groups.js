var express = require('express');
var router = express.Router();

const groupController = require('./../controllers/group');

router.route('/')
  .get(groupController.getGroups)
  .post(groupController.addGroup);

router.route('/:id')
  .get(groupController.getGroup)
  .delete(groupController.deleteGroup)
  .put(groupController.updateGroup);

module.exports = router;