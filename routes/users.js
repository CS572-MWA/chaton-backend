var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/User.js');

router.get('/', function(req, res) {
  User.find(function (err, users) {
    res.like(users,err);
  });
});

router.get('/:id', function(req, res) {
  User.findById(req.params.id, function (err, post) {
    res.like(post,err);
  });
});

router.post('/', function(req, res) {
  User.create(req.body, function (err, post) {
    res.like(post,err);
  });
});

router.put('/:id', function(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    res.like(post,err);
  });
});

router.delete('/:id', function(req, res) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    res.like(post,err);
  });
});

module.exports = router;