var Group = require('./../models/group');
const mongoose = require('mongoose');

exports.getGroups = (req, res) => {
  Group.find( (err, groups) => {
    res.like(groups,err);
  });
};

exports.addGroup = (req, res) => {
  const options = {
    path: 'users',
    select: 'username email age gender'
  };
  Group.findOneAndUpdate(
      { _id:mongoose.Types.ObjectId() }, 
      req.body, {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
        populate: options
      },
      (err, group) => {
        res.like(group, err);
      });
};

exports.getGroup = (req, res) => {
  Group.findById(req.params.id, function (err, post) {
    res.like(post,err);
  });
};

exports.updateGroup = (req, res) => {
  Group.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    res.like(post,err);
  });
};

exports.deleteGroup = (req, res) => {
  Group.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    res.like(post,err);
  });
};