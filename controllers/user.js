var User = require('./../models/user');
const jwt = require('jsonwebtoken')
const config = require('./../config/main')
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    const result = { auth: false, token: null };
    if (err) return res.like(user, err);
    //if (check) return res.like(user, result)
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.like(null, result);
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400
    });
    console.log(token);
    res.like({ auth: true, token: token }, err);
  });
};

exports.getUsers = (req, res) => {
  User.find((err, users) => {
    res.like(users,err);
  });
};
exports.addUser = (req, res) => {
  User.create(req.body, (err, user) => {
    if (err){
      res.like(user,err);
    }else{
      const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400
      });
      res.like({ auth: true, token: token }, err);
    }
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