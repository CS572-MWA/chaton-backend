var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Log = require('../models/log.js');

router.get('/', function(req, res, next) {
    Log.find(function (err, logs) {
    if (err) return next(err);
    res.json(logs);
  });
});

router.get('/:id', function(req, res, next) {
    Log.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/', function(req, res, next) {
    Log.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', function(req, res, next) {
    Log.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', function(req, res, next) {
    Log.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;