var User = require('./../models/User.js');
const jwt = require('jsonwebtoken')
const config = require('./../config/main')

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    //err !user || check
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400
    });
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