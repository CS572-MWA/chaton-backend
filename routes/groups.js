var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Group = require('../models/Group.js');

router.get('/', function(req, res) {
  Group.find(function (err, groups) {
    res.like(groups,err);
  });
});

router.get('/:id', function(req, res) {
  Group.findById(req.params.id, function (err, post) {
    res.like(post,err);
  });
});

router.post('/', function(req, res) {
  Group.create(req.body, function (err, post) {
    res.like(post,err);
  });
});

router.put('/:id', function(req, res) {
  Group.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    res.like(post,err);
  });
});

router.delete('/:id', function(req, res) {
  Group.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    res.like(post,err);
  });
});

module.exports = router;