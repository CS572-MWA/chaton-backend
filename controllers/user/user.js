var User = require('./../../models/user');
var Group = require('./../../models/group');
const jwt = require('jsonwebtoken')
const config = require('./../../config/main')
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    const result = { auth: false, token: null };
    if (err) return res.like(user, err);
    if (!user) return res.like(null, { message: 'User not found' });
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    result.password = passwordIsValid;
    if (!passwordIsValid) return res.like(null, result);
    var token = jwt.sign({ id: user._id, email: user.email, username: user.username, gender: user.gender, age: user.age }, config.secret, {
      expiresIn: 86400
    });
    console.log(token);
    res.like({ auth: true, token: token }, err);
  });
};

exports.getUsers = (req, res) => {
  User.find((err, users) => {
    res.like(users,err);
  },{ password: 0 });
};

exports.addUser = (req, res) => {
  User.create(req.body, (err, user) => {
    if (err){
      res.like(user,err);
    }else{
      var token = jwt.sign({ id: user._id, email: user.email, username: user.username, gender: user.gender, age: user.age }, config.secret, {
        expiresIn: 86400
      });
      res.like({ auth: true, token: token }, err);
    }
  });
};

exports.getGroups = (req, res) => {
  Group.find({ users: req.user.id })
    .populate({
      path: 'users',
      select: 'username email age gender'
    })
    .exec((err, groups) => {
      res.like(groups, err);
    });
};

exports.addUserForGroup = (req, res) => {
  Group.findByIdAndUpdate(req.params.id, { $addToSet: { users: { $each: req.body.users } } }, (err, groups) => {
    res.like(groups, err);
  })
};

exports.getUser = (req, res) => {
  User.findById(req.params.id, (err, post) => {
    res.like(post,err);
  });
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user.id, req.body, (err, user) => {
    if (err){
      res.like({ auth: true, token: token, user: user }, err);
    }else{
      var token = jwt.sign({ id: user._id, email: user.email, username: user.username, gender: user.gender, age: user.age }, config.secret, {
        expiresIn: 86400
      });
      res.like({ auth: true, token: token, user: user }, err);
    }
  });
};

exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.user.id, req.body, (err, post) =>{
    res.like(post,err);
  });
};