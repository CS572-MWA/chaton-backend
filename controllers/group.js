var Group = require('./../models/Group.js');

exports.getGroups = (req, res) => {
  Group.find( (err, groups) => {
    res.like(groups,err);
  });
};

exports.addGroup = (req, res) => {
  Group.create(req.body, function (err, post) {
    res.like(post,err);
  });
};

exports.getGroup = (req, res) => {
  User.findById(req.params.id, function (err, post) {
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