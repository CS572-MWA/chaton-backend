var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({ status: 'success', data: "Hello my baby.", error: null });
});

module.exports = router;
