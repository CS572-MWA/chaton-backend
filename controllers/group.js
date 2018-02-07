
const mongoose = require('mongoose');
var Group = require('./../models/group');
const Log = require('./../models/log');

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

exports.getGroups = (req, res) => {
  Log.getLogs(req.user, (err, data) =>{
    res.like(data, err);
  });
};

exports.addUserForGroup = (req, res) => {
  const options = {
    path: 'users',
    select: 'username email age gender'
  };
  Group.findByIdAndUpdate(req.params.id, { $addToSet: { users: { $each: req.body.users } } }, { upsert: true, new: true, runValidators: true, populate: options }, (err, groups) => {
    res.like(groups, err);
  })
};

exports.removeUserForGroup = (req, res) => {
  Group.findByIdAndUpdate(req.params.id, { $pull: { users: req.params.user_id } }, {upsert: true, new: true}).exec((err, groups) => {
    res.like(groups, err);
  })
};