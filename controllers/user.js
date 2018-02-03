var User = require('./../models/User.js');

exports.getUsers = (req, res) => {
  User.find(function (err, users) {
    res.like(users,err);
  });
};
exports.addUser = (req, res) => {
  User.create(req.body, function (err, post) {
    res.like(post,err);
  });
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    res.like(post,err);
  });
};

exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    res.like(post,err);
  });
};