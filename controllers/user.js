var User = require('./../models/User.js');

exports.getUsers = (req, res) => {
  User.find((err, users) => {
    res.like(users,err);
  });
};
exports.addUser = (req, res) => {
  User.create(req.body, (err, post) => {
    res.like(post,err);
  });
};

exports.getUser = (req, res) => {
  User.findById(req.params.id, (err, post) => {
    res.like(post,err);
  });
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    res.like(post,err);
  });
};

exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id, req.body, (err, post) =>{
    res.like(post,err);
  });
};