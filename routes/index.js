var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.like("Hello my baby", null);
});

module.exports = router;
