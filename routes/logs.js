var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Log = require('../models/log');

router.get('/', function(req, res) {
  Log.find(function (err, logs) {
    res.like(logs,err);
  });
});

router.get('/:id', function(req, res) {
  Log.findById(req.params.id, function (err, post) {
    res.like(post,err);
  });
});

router.post('/', function(req, res) {
  Log.create(req.body, function (err, post) {
    res.like(post,err);
  });
});

router.put('/:id', function(req, res) {
  Log.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    res.like(post,err);
  });
});

router.delete('/:id', function(req, res) {
  Log.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    res.like(post,err);
  });
});

module.exports = router;