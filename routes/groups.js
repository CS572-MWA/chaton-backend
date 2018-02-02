var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Group = require('../models/group.js');

router.get('/', function(req, res, next) {
    Group.find(function (err, groups) {
    if (err) return next(err);
    res.json(groups);
  });
});

router.get('/:id', function(req, res, next) {
    Group.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/', function(req, res, next) {
    Group.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', function(req, res, next) {
    Group.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', function(req, res, next) {
    Group.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;